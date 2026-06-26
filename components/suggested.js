"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, TrendingUp } from "lucide-react";

export default function SuggestedProducts({ products = [] }) {
  const [suggested, setSuggested] = useState([]);
  const [isPersonalized, setIsPersonalized] = useState(false);

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) return;

    const viewedCategories = JSON.parse(
      localStorage.getItem("viewedCategories")
    ) || [];

    let recommendations = [];

    if (viewedCategories.length > 0) {
      recommendations = products.filter((p) =>
        viewedCategories.includes(p.category)
      );
      recommendations = recommendations.filter(
        (p, i, self) => i === self.findIndex((x) => x._id === p._id)
      );
      setIsPersonalized(true);
    }

    if (recommendations.length < 6) {
      const trending = products
        .filter((p) => !recommendations.some((r) => r._id === p._id))
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));
      recommendations = [...recommendations, ...trending];
    }

    if (viewedCategories.length === 0) setIsPersonalized(false);

    setSuggested(recommendations.slice(0, 6));
  }, [products]);

  if (suggested.length === 0) return null;

  const featured = suggested[0];
  const secondFeatured = suggested[1];
  const rest = suggested.slice(2);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">

      {/* ── Section Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <Sparkles className="text-white" size={18} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isPersonalized ? "Picked For You" : "Trending Now"}
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {isPersonalized
                ? "Based on what you've been browsing"
                : "What shoppers are loving this week"}
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── Featured Card (large, left) ── */}
        <Link
          href={`/product/${featured._id}`}
          className="lg:col-span-5 group"
        >
          <div className="relative h-full min-h-[380px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500">

            {/* Background image */}
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            {/* Badge */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
              <TrendingUp size={12} />
              {isPersonalized ? "For You" : "Trending"}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-2">
                {featured.category}
              </p>
              <h3 className="text-white text-xl sm:text-2xl font-bold line-clamp-2 leading-snug">
                {featured.title}
              </h3>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-extrabold text-white">
                  ₹{featured.price}
                </span>
                <span className="text-slate-400 line-through text-sm">
                  ₹{Math.round(featured.price * 1.3)}
                </span>
                <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  {Math.round(((featured.price * 0.3) / (featured.price * 1.3)) * 100)}% OFF
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={13}
                      className={s <= 4 ? "fill-blue-400 text-blue-400" : "text-slate-600"}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white/80 bg-white/10 px-3 py-1.5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                  View Product →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── Right Column ── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Second featured — wider horizontal card */}
          {secondFeatured && (
            <Link
              href={`/product/${secondFeatured._id}`}
              className="sm:col-span-2 group"
            >
              <div className="relative flex items-center gap-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

                {/* Subtle blue accent blob */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image */}
                <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                  <img
                    src={secondFeatured.image}
                    alt={secondFeatured.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 relative z-10">
                  <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
                    {secondFeatured.category}
                  </span>
                  <h3 className="text-slate-900 font-bold text-base sm:text-lg leading-snug line-clamp-2">
                    {secondFeatured.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{secondFeatured.price}
                    </span>
                    <span className="text-slate-400 line-through text-sm">
                      ₹{Math.round(secondFeatured.price * 1.3)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 relative z-10">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Remaining 4 small cards */}
          {rest.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">

                {/* Image */}
                <div className="w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">
                    {product.category}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 mt-0.5 flex-1">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through ml-1.5">
                        ₹{Math.round(product.price * 1.3)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {Math.round(((product.price * 0.3) / (product.price * 1.3)) * 100)}% off
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* Mobile "View All" button */}
      <div className="sm:hidden mt-6">
        <Link
          href="/products"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 transition"
        >
          View All Products
          <ArrowRight size={16} />
        </Link>
      </div>

    </section>
  );
}
