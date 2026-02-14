import { Link } from "@/i18n/routing"

export interface RedirectButtonProps {
        href: string;
    label: string;
}

export const RedirectButton = ({ href, label }: RedirectButtonProps) => {
    return (
        <Link href={href}>
            <div className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white py-2 px-4 rounded">
                {label}
            </div>
        </Link>
    )
}