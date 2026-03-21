import { api } from "@/lib/apiFetch/apiFetch";
import { UserProfile } from "./authModel";

export class AuthService {
    static async getProfile(): Promise<UserProfile | null> {
        try {
            const response = await api.get<UserProfile>("/v1/auth/profile");
            return response.data;
        } catch (error) {
            return null;
        }
    }
    static async logout(): Promise<void> {
        // Clear auth cookies
        if (typeof window !== "undefined") {
            const cookies = ["access_token", "refresh_token", "user_id"];
            cookies.forEach(name => {
                document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
            });
        }
    }
}
