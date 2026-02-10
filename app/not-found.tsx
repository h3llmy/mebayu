"use client";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="min-h-[100vh] flex items-center justify-center bg-[#f8f7f4] px-6">
      <div className="text-center max-w-xl">

        {/* 404 Number */}
        <h1 className="text-7xl md:text-8xl font-light text-[#507c59] tracking-wider">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-2xl md:text-3xl font-light text-[#2D2D2A]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s take you back home.
        </p>

        {/* Button */}
        <div className="mt-10">
          <button
            onClick={() => router.back()}
            className="inline-block px-8 py-3 text-sm tracking-widest uppercase bg-[#507c59] text-white rounded-sm hover:bg-[#466e4e] transition-all duration-300"
          >
            Back to Home
          </button>
        </div>

        {/* Decorative line */}
        <div className="w-16 h-[1px] bg-[#507c59] mx-auto mt-12 opacity-40" />
      </div>
    </section>
  );
}
