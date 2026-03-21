import { api } from "../../apiFetch/apiFetch";
import { Setting, UpsertSettingDto } from "./settingModel";

export class SettingService {
    static async get(): Promise<Setting | null> {
        try {
            const response = await api.get<{ data: Setting }>("/v1/settings");
            return response.data.data;
        } catch (error: any) {
            console.error("Failed to fetch settings:", error);
            return null;
        }
    }

    static async upsert(data: UpsertSettingDto): Promise<Setting> {
        const response = await api.put<{ data: Setting }>("/v1/settings", data);
        return response.data.data;
    }
}
