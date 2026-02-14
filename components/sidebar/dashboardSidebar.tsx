import { Link } from "@/i18n/routing";
import { SidebarLink } from "./sidebarLink";

export const DashboardSidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100 mb-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-[#507c59] p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        Mebayu<span className="text-[#507c59]">.</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto pt-4 px-4 space-y-8">
                <div>
                    <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
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
                            href="/dashboard/orders" 
                            label="Orders" 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
                        />
                    </div>
                </div>

                <div>
                    <p className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
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
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-2 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-9 h-9 rounded-full bg-[#507c59]/10 flex items-center justify-center text-[#507c59] font-bold text-xs ring-2 ring-white shadow-sm">
                        AD
                    </div>
                    <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
                        <p className="text-xs text-gray-500 truncate font-medium">admin@mebayu.com</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </aside>
    );
};

