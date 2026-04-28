import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = axios.create({
    baseURL: BASE_URL,
    //   withCredentials: true, // send cookies automatically
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

function processQueue(error: unknown) {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
}

async function getAccessToken(): Promise<string | null> {
    // 🟢 SERVER SIDE
    if (typeof window === "undefined") {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            return cookieStore.get("access_token")?.value ?? null;
        } catch {
            return null;
        }
    }

    // 🔵 CLIENT SIDE
    const match = document.cookie.match(/(^| )access_token=([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
}

async function getLocale(): Promise<string | null> {
    // 🟢 SERVER SIDE
    if (typeof window === "undefined") {
        try {
            // Try to get from next-intl/server first as it's most reliable for App Router
            const { getLocale: getIntlLocale } = await import("next-intl/server");
            const locale = await getIntlLocale();
            if (locale) return locale;
        } catch {
            // Fallback to cookies if getLocale fails
        }

        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            return cookieStore.get("NEXT_LOCALE")?.value ?? null;
        } catch {
            return null;
        }
    }

    // 🔵 CLIENT SIDE
    // 1. Try cookie first
    const match = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
    if (match) return decodeURIComponent(match[2]);

    // 2. Fallback to URL pathname
    const pathLocale = window.location.pathname.split('/')[1];
    if (pathLocale === "en" || pathLocale === "id") return pathLocale;

    return null;
}

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    const locale = await getLocale();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const url = config.url ?? "";
    const skipLocale = config.headers["x-skip-locale"] === "true";

    if (skipLocale) {
        delete config.headers["x-skip-locale"];
    } else if (locale) {
        // ALWAYS send Accept-Language header if locale is known
        config.headers["Accept-Language"] = locale;

        // Add lang query param if not skipping
        config.params = { lang: locale, ...config.params };
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => api(originalRequest));
        }

        isRefreshing = true;

        try {
            await axios.post(
                `${BASE_URL}/api/v1/auth/refresh`,
                {},
                { withCredentials: true }
            );

            processQueue(null);
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);