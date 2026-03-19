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
}
