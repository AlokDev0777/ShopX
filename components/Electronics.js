import React from "react";
import Link from "next/link";
import { ArrowRight, Laptop } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Category items — easy to extend or pull from an API later
const ELECTRONICS_ITEMS = [
  {
    label: "Laptops",
    href: "/search?q=laptops",
    image: "/laptop.png",
    tag: "Best Seller",
    tagColor: "bg-blue-600",
  },
  {
    label: "MacBooks",
    href: "/search?q=macbooks",
    image: "/macbook.png",
    tag: "Premium",
    tagColor: "bg-slate-900",
  },
  {
    label: "Accessories",
    href: "/search?q=accessories",
    image: "/organizer bag.png",
    tag: "New In",
    tagColor: "bg-emerald-600",
  },
  {
    label: "Monitors",
    href: "/search?q=monitors",
    image: "/Monitor.png",
    tag: "Top Rated",
    tagColor: "bg-violet-600",
  },
];

const Electronics = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (query) => {
    // Implement your search logic here, e.g., redirect to a search results page

    router.push(`/search?q=${query}`);

  }
  

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

        {/* ── Section Header ── */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-7 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <Laptop size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Laptops & Accessories
              </h2>
              <p className="text-slate-400 text-sm mt-0.5 hidden sm:block">
                Top picks in computing
              </p>
            </div>
          </div>

          <Link
            href="/search?q=electronics"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition shrink-0"
          >
            View All
            <ArrowRight size={15} />
          </Link>
        </div>

  

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-slate-100">
          {ELECTRONICS_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex flex-col items-center px-4 py-8 hover:bg-slate-50 transition-colors duration-200"
            >
              {/* Tag Badge */}
              <span
                className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2.5 py-1 rounded-full ${item.tagColor}`}
              >
                {item.tag}
              </span>

              {/* Image */}
              <div className="w-full aspect-square max-w-[140px] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>

              {/* Label */}
              <div className="mt-5 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.label}
                </h3>
                <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-slate-400 group-hover:text-blue-500 transition-colors font-medium">
                  Shop now <ArrowRight size={11} />
                </span>
              </div>

              {/* Bottom active indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-blue-600 rounded-full group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* ── Bottom Banner ── */}
        <div className="mx-6 sm:mx-8 mb-6 mt-1 rounded-2xl bg-slate-900 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-base">
              🔥 Limited Time — Up to 40% off on MacBooks
            </p>
            <p className="text-slate-400 text-sm mt-0.5">
              While stocks last. No coupon needed.
            </p>
          </div>
          <Link
            href="/search?q=macbooks"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            Grab the Deal
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Electronics;
