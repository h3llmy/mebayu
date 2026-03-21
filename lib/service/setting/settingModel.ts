
export interface HeroImage {
    id: string;
    image_url: string;
    order_index: number;
    setting_id: string;
    created_at: string;
    updated_at: string;
}

export interface Setting {
    id: string;
    email: string;
    whatsapp_number: string;
    hero_images: HeroImage[];
    created_at: string;
    updated_at: string;
}

export interface UpsertSettingDto {
    email: string | null;
    whatsapp_number: string | null;
    hero_images: string[];
}
