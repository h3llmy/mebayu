import { useTranslations } from "next-intl";
import Link from "next/link";

export const Footer = () => {
  const t = useTranslations("Components.Footer");

  return (
    <footer className="bg-gradient-to-b from-[#507c59] to-[#3f6247] text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-16 border-b border-white/10 pb-16">

          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl tracking-[0.3em] uppercase font-light">
              Mebayu
            </h2>

            <p className="text-white/80 leading-relaxed max-w-md">
              {t("description")}
            </p>

            {/* Social Links (Text Style) */}
            <div className="flex items-center gap-6 pt-4 text-sm tracking-widest uppercase">
              <a
                href="https://www.instagram.com/mebayu.idn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition duration-300"
              >
                Instagram
              </a>
              <a
                href="mailto:hello@mebayu.com"
                className="text-white/70 hover:text-white transition duration-300"
              >
                Email
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 text-sm">

            <div className="space-y-4">
              <h3 className="tracking-[0.25em] uppercase text-white/60">
                {t("explore")}
              </h3>

              <div className="flex flex-col gap-3 text-white/80">
                <Link href="#about" className="hover:text-white transition">
                  {t("about")}
                </Link>
                <Link href="#products" className="hover:text-white transition">
                  {t("products")}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="tracking-[0.25em] uppercase text-white/60">
                {t("connect")}
              </h3>

              <div className="flex flex-col gap-3 text-white/80">
                <p>Bali, Indonesia</p>
                <a
                  href="mailto:hello@mebayu.com"
                  className="hover:text-white transition"
                >
                  hello@mebayu.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 text-center text-xs tracking-widest text-white/50">
          © {new Date().getFullYear()} Mebayu — Crafted in Bali.
        </div>

      </div>
    </footer>
  );
};
