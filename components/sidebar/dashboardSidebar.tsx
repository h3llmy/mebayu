import { Link } from "@/i18n/routing";

export const DashboardSidebar = () => {
    // We can add translations later if needed, but for now hardcode English/Indonesian fallback
    // or just use English keys if they exist. Users can add keys later.
    // Let's assume some basic keys might exist or just use English text for now.
    
    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Link href="/" className="text-xl font-bold tracking-widest text-[#507c59] uppercase">
                    Mebayu
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Menu
                </p>
                
                <SidebarLink href="/dashboard" label="Dashboard" />
                <SidebarLink href="/dashboard/products" label="Products" />
                <SidebarLink href="/dashboard/orders" label="Orders" />
                <SidebarLink href="/dashboard/customers" label="Customers" />

                <div className="pt-6">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Settings
                    </p>
                    <SidebarLink href="/dashboard/settings" label="General" />
                    <SidebarLink href="/dashboard/users" label="Users" />
                </div>
            </nav>

            {/* Footer / User */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-xs">
                        AD
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Admin</p>
                        <p className="text-xs text-gray-500">admin@mebayu.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const SidebarLink = ({ href, label }: { href: string; label: string }) => {
    return (
        <Link 
            href={href} 
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-[#507c59] group transition-colors"
        >
            {label}
        </Link>
    );
};
