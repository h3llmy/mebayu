import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const t = useTranslations("Components.Footer");

  return (
    <footer className="bg-[#2D2D2A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-16">

        {/* Brand and Connect */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24 items-start">

          {/* Large Brand Title */}
          <div className="lg:col-span-6">
            <h2 className="text-[12vw] lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.8] text-white/5 select-none pointer-events-none mb-10 translate-x-[-0.5vw]">
              MEBAYU
            </h2>
            <div className="max-w-md relative z-10">
              <p className="text-white/60 text-xl font-light leading-relaxed mb-10 border-l border-[#507c59] pl-8">
                {t("description")}
              </p>
              
              <div className="flex items-center gap-8 pt-4">
                 <a 
                   href="https://www.instagram.com/mebayu.idn/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-500"
                 >
                   <Instagram className="w-5 h-5" />
                 </a>
                 <a 
                   href="mailto:hello@mebayu.com" 
                   className="group p-4 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-500"
                 >
                   <Mail className="w-5 h-5" />
                 </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-1 gap-12">
            <div>
              <h3 className="text-[#507c59] tracking-[0.4em] uppercase text-[10px] font-bold mb-10">
                {t("explore")}
              </h3>
              <ul className="space-y-6 text-sm tracking-widest font-light">
                {["about", "products"].map((i) => (
                  <li key={i}>
                    <Link href={`/#${i}`} className="group inline-flex items-center gap-2 hover:text-[#507c59] transition-all">
                      {t(i)}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
             <h3 className="text-[#507c59] tracking-[0.4em] uppercase text-[10px] font-bold mb-10">
                {t("connect")}
              </h3>
              <ul className="space-y-8 text-sm tracking-widest font-light">
                <li className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[#507c59] mt-0.5 shrink-0" />
                  <span className="text-white/60">Bali, Indonesia<br/>Denpasar, 80234</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-[#507c59] shrink-0" />
                  <a href="mailto:hello@mebayu.com" className="hover:text-white transition">hello@mebayu.com</a>
                </li>
              </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] tracking-[0.5em] uppercase text-white/30 font-bold">
          <div>
            © {new Date().getFullYear()} Mebayu — Handcrafted in Bali.
          </div>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-white transition decoration-transparent hover:decoration-[#507c59] underline underline-offset-8">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition decoration-transparent hover:decoration-[#507c59] underline underline-offset-8">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
