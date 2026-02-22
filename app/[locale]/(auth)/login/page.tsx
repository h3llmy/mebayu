import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { LoginForm } from "@/components/auth/loginForm";
import { Link, redirect } from "@/i18n/routing";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return redirect({
      href: `/dashboard`,
      locale: await getLocale(),
    });
  }

  const t = await getTranslations("Pages.Login");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Brand Section */}
      <div className="hidden md:flex md:w-1/2 bg-[var(--primary)] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg">
            <Image
              src="/app-logo.png"
              alt="Mebayu"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight">MEBAYU</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            {t("brandTitle")}
          </h1>
          <p className="text-lg text-white/80 font-light leading-relaxed">
            {t("brandDescription")}
          </p>
        </div>

        <div className="relative z-10 text-sm text-white/60">
          © {new Date().getFullYear()} Mebayu Leather Bali. All rights reserved.
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col gap-2">
            {/* Mobile Logo */}
            <div className="md:hidden flex justify-center mb-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="bg-[var(--primary)] p-2 rounded-lg">
                  <Image
                    src="/app-logo.png"
                    alt="Mebayu"
                    width={28}
                    height={28}
                    className="invert brightness-0"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-[var(--primary)]">MEBAYU</span>
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-gray-500 font-light">
              {t("description")}
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
