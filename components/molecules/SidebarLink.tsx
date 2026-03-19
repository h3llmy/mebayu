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
                    ? "bg-[var(--primary-light)] text-[var(--primary)] dark:bg-[var(--primary-hover)]/20 dark:text-[var(--primary)]" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                }
            `}
        >
            {icon && (
                <div className={`
                    transition-colors duration-200
                    ${isActive ? "text-[var(--primary)]" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"}
                `}>
                    {icon}
                </div>
            )}
            {label}
            {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)] dark:bg-[var(--primary)]" />
            )}
        </Link>
    );
};
