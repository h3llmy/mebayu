"use client";

interface WhatsAppButtonProps {
    phoneNumber: string; // Example: 628123456789
    message?: string;
}

export const WhatsAppButton = ({
    phoneNumber,
    message = "Hello I’m interested in your service",
}: WhatsAppButtonProps) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-50
                 w-16 h-16
                 flex items-center justify-center
                 rounded-full
                 bg-green-500 hover:bg-green-600
                 shadow-lg
                 transition-all duration-300 hover:scale-110"
        >
            {/* WhatsApp SVG */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-8 h-8 fill-white"
            >
                <path d="M16.001 3C8.82 3 3 8.82 3 16c0 2.823.92 5.43 2.48 7.56L3 29l5.62-2.42A12.94 12.94 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16.001 3zm0 23.5c-2.34 0-4.52-.73-6.33-1.98l-.45-.3-3.34 1.44 1.46-3.25-.29-.47A10.47 10.47 0 015.5 16c0-5.79 4.71-10.5 10.5-10.5S26.5 10.21 26.5 16 21.79 26.5 16.001 26.5zm5.79-7.88c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.25-.18.21-.36.24-.68.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.5.14-.66.14-.14.32-.36.48-.54.16-.18.21-.32.32-.54.11-.21.05-.39-.03-.54-.08-.16-.71-1.7-.97-2.33-.26-.63-.52-.54-.71-.55h-.61c-.21 0-.54.08-.82.39-.29.32-1.08 1.06-1.08 2.58s1.11 2.99 1.27 3.2c.16.21 2.19 3.34 5.3 4.69.74.32 1.32.51 1.77.65.74.23 1.41.2 1.94.12.59-.09 1.88-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
            </svg>
        </a>
    );
}
