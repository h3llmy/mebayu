"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export const DashboardNavbar = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "id" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-40 px-6 flex items-center justify-end">
            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                    <span className="sr-only">Notifications</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                
                <button onClick={toggleLocale} className="text-sm font-medium text-gray-700 hover:cursor-pointer">{locale.toUpperCase()}</button>
            </div>
        </header>
    );
};
