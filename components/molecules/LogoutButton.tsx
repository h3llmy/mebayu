"use client";

import { AuthService } from "@/lib/service/auth/authService";
import { useRouter } from "@/i18n/routing";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        if (confirm("Are you sure you want to log out?")) {
            await AuthService.logout();
            router.push("/login");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-200 group"
        >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-semibold">Logout</span>
        </button>
    );
};
