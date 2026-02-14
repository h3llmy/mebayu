"use client";

import { Link, usePathname } from "@/i18n/routing";
import React from "react";

export const SidebarLink = ({ 
    href, 
    label, 
    icon 
}: { 
    href: string; 
    label: string;
    icon?: React.ReactNode;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

    return (
        <Link 
            href={href} 
            className={`
                flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group
                ${isActive 
                    ? "bg-[#507c59]/10 text-[#507c59]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
            `}
        >
            {icon && (
                <div className={`
                    transition-colors duration-200
                    ${isActive ? "text-[#507c59]" : "text-gray-400 group-hover:text-gray-600"}
                `}>
                    {icon}
                </div>
            )}
            {label}
            {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#507c59]" />
            )}
        </Link>
    );
};
