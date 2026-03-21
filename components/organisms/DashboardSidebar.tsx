import { Link } from "@/i18n/routing";
import { SidebarLink } from "../molecules/SidebarLink";
import { AuthService } from "@/lib/service/auth/authService";

import { LogoutButton } from "../molecules/LogoutButton";

function getInitials(name: string): string {
    return name
        .split(/[\s_@]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

export const DashboardSidebar = async () => {
    const profile = await AuthService.getProfile();

    const displayName = profile?.username ?? "Admin";
    const displayEmail = profile?.email ?? "—";
    const initials = getInitials(displayName);

    return (
        <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-screen fixed left-0 top-0 flex flex-col z-50 transition-colors duration-200">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800 mb-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-[var(--primary)] p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Mebayu<span className="text-[var(--primary)]">.</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto pt-4 px-4 space-y-8">
                <div>
                    <p className="px-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                        Main Menu
                    </p>
                    <div className="space-y-1">
                        <SidebarLink
                            href="/dashboard"
                            label="Dashboard"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        />
                        <SidebarLink
                            href="/dashboard/products"
                            label="Products"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                        />
                        <SidebarLink
                            href="/dashboard/categories"
                            label="Categories"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        />
                        <SidebarLink
                            href="/dashboard/materials"
                            label="Materials"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
                        />
                        <SidebarLink
                            href="/dashboard/foundations"
                            label="Foundations"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        />
                        <SidebarLink
                            href="/dashboard/orders"
                            label="Orders"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                        />
                    </div>
                </div>

                <div>
                    <p className="px-3 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                        Configuration
                    </p>
                    <div className="space-y-1">
                        <SidebarLink
                            href="/dashboard/settings"
                            label="Settings"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        />
                    </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-800">
                    <LogoutButton />
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 w-full px-2 py-2.5 rounded-xl transition-colors duration-200">
                    <div className="w-9 h-9 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] font-bold text-xs ring-2 ring-white dark:ring-gray-950 shadow-sm shrink-0">
                        {initials}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">{displayEmail}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};
;

