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
    reject: (reason?: any) => void;
}[] = [];

function processQueue(error: any) {
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

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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