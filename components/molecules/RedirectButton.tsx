import { Link } from "@/i18n/routing"

export interface RedirectButtonProps {
    href: string;
    label: string;
    className?: string;
}

export const RedirectButton = ({ href, label, className = "" }: RedirectButtonProps) => {
    return (
        <Link href={href} className={className}>
            <div className={`bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white py-2 px-6 rounded-lg font-medium transition-all duration-200 text-center shadow-sm hover:shadow-md ${className}`}>
                {label}
            </div>
        </Link>
    );
};