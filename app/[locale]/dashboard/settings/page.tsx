"use client";

import { useEffect, useState } from "react";
import { SettingService } from "@/lib/service/setting/settingService";
import { Setting, UpsertSettingDto } from "@/lib/service/setting/settingModel";
import { ImageUpload, UploadedFile } from "@/components/molecules/ImageUpload";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState<Setting | null>(null);

    // Form states
    const [email, setEmail] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [heroImages, setHeroImages] = useState<UploadedFile[]>([]);

    useEffect(() => {
        const loadSettings = async () => {
            setIsLoading(true);
            try {
                const data = await SettingService.get();
                if (data) {
                    setSettings(data);
                    setEmail(data.email || "");
                    setWhatsappNumber(data.whatsapp_number || "");
                    
                    // Map existing hero images to UploadedFile format
                    const existingImages: UploadedFile[] = data.hero_images.map(img => ({
                        file_key: img.image_url.split('/').pop() || "",
                        public_url: img.image_url
                    }));
                    setHeroImages(existingImages);
                }
            } catch (error) {
                console.error("Failed to load settings", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const dto: UpsertSettingDto = {
                email: email || null,
                whatsapp_number: whatsappNumber || null,
                hero_images: heroImages.map(img => img.public_url),
            };
            const updated = await SettingService.upsert(dto);
            setSettings(updated);
            
            // Refresh hero images with the ones from backend
            const updatedImages: UploadedFile[] = updated.hero_images.map(img => ({
                file_key: img.image_url.split('/').pop() || "",
                public_url: img.image_url
            }));
            setHeroImages(updatedImages);
            
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Failed to save settings", error);
            alert("Failed to save settings. Please check console for details.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Website Settings</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Configure global settings and hero assets for the Mebayu platform.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Contact Information */}
                <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="p-6 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contact Information</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. hello@mebayu.com"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">WhatsApp Number</label>
                            <input
                                type="text"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                placeholder="e.g. 62812345678"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Hero Images */}
                <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 rounded-t-xl flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hero Section Images</h2>
                    </div>
                    <div className="p-6">
                        <ImageUpload
                            label="Hero Slider Images"
                            maxFiles={10}
                            value={heroImages}
                            onChange={setHeroImages}
                            uploadPath="hero"
                            helperText="Manage the images displayed in the main website slider. High-resolution landscape images (1920x1080) are recommended."
                        />
                    </div>
                </section>

                {/* Save Button */}
                <div className="flex justify-end pt-4 pb-12">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`
                            relative px-8 py-3.5 rounded-2xl font-bold text-white transition-all shadow-lg 
                            ${isSaving ? 'bg-[var(--primary-dark)] scale-95 opacity-80 cursor-not-allowed' : 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] hover:shadow-[var(--primary-light)]/40 active:scale-95'}
                        `}
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Changes...
                            </div>
                        ) : (
                            "Save All Settings"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
