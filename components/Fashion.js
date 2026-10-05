import React from "react";
import Link from "next/link";
import { ArrowRight, Shirt } from "lucide-react";

// Category items — replace images with your actual assets
const FASHION_ITEMS = [
  {
    label: "T-Shirts",
    href: "/search?q=t-shirts",
    image: "/t-shirt.png",
    tag: "Trending",
    tagColor: "bg-rose-500",
    bg: "bg-rose-50",
  },
  {
    label: "Cargo Pants",
    href: "/search?q=cargo-pants",
    image: "/jeans2.png",
    tag: "New In",
    tagColor: "bg-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Handbags",
    href: "/search?q=handbags",
    image: "/handbag.png",
    tag: "Popular",
    tagColor: "bg-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Jackets",
    href: "/search?q=jackets",
    image: "/jacket.png",
    tag: "Season Pick",
    tagColor: "bg-slate-900",
    bg: "bg-slate-50",
  },
];

const Fashion = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

        {/* ── Section Header ── */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-7 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-rose-500 flex items-center justify-center">
              <Shirt size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Fashion & Style
              </h2>
              <p className="text-slate-400 text-sm mt-0.5 hidden sm:block">
                Trending looks for every occasion
              </p>
            </div>
          </div>

          <Link
            href="/search?q=fashion"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition shrink-0"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Cards Grid ── */}
        {/* 
          On mobile: 2-column grid
          On desktop: 4-column grid with the first card wider (span 2) 
          to create a featured item feel
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8">

          {FASHION_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative rounded-2xl overflow-hidden ${item.bg} border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                // Make first card span 2 columns on large screens for a "featured" layout
                index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {/* Tag */}
              <span
                className={`absolute top-3 left-3 z-10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${item.tagColor}`}
              >
                {item.tag}
              </span>

              {/* Image */}
              <div
                className={`w-full flex items-center justify-center overflow-hidden px-4 pt-10 pb-4 ${
                  index === 0 ? "h-56 sm:h-64" : "h-44 sm:h-52"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              {/* Footer */}
              <div className="px-4 pb-4 pt-1 flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </h3>
                <span className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}

        </div>

        {/* ── Bottom Banner ── */}
        <div className="mx-6 sm:mx-8 mb-6 rounded-2xl overflow-hidden relative bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Decorative circles */}
          <div className="absolute right-24 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/2" />
          <div className="absolute right-10 top-full w-16 h-16 rounded-full bg-white/10 -translate-y-1/2" />

          <div className="relative z-10">
            <p className="text-white font-bold text-base">
              ✨ New Season Collection — Up to 50% Off
            </p>
            <p className="text-rose-100 text-sm mt-0.5">
              Fresh styles added daily. Free shipping on orders above ₹499.
            </p>
          </div>
          <Link
            href="/search?q=fashion"
            className="relative z-10 shrink-0 bg-white hover:bg-rose-50 text-rose-600 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Fashion;
