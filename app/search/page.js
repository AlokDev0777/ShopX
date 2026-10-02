"use client";

import { useSearchParams } from "next/navigation";
import Filters from "@/components/filters";
import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import Nav from "@/components/Nav";
import Link from "next/link";
export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await res.json();

      setProducts(data.products);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f6f7]">

      <Nav />
      {/* ================= HERO SEARCH SECTION ================= */}

      {/* ================= FILTER + PRODUCTS ================= */}


      <section className="relative flex flex-1 gap-[1vw] justify-around px-[1vw]">

        <Filters />

      <section className="w-7xl mx-auto px-6 py-14">
       
        
        {/* Top Filter Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h2>

          </div>

          {/* Right */}
          {/* <div className="flex flex-wrap gap-4">
            <button className="bg-white border border-gray-200 text-gray-900 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              <SlidersHorizontal size={18} />
              Filters
            </button>

           

            <button className="bg-white border border-gray-200 text-gray-900 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              Latest
              <ChevronDown size={18} />
            </button>

            <button className="bg-white border border-gray-200 text-gray-900 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              Price
              <ChevronDown size={18} />
            </button>
          </div> */}
        </div>

        {/* PRODUCT GRID */}

        {loading ? (
          /* =========================
             LOADING SKELETON
          ========================== */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="animate-pulse">

                {/* IMAGE SKELETON */}
                <div className="relative aspect-square rounded-[28px] bg-gray-200 overflow-hidden">

                  {/* HEART SKELETON */}
                  <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gray-300" />

                </div>

                {/* TEXT SKELETON */}
                <div className="mt-4 px-1">

                  {/* TITLE */}
                  <div className="h-5 bg-gray-200 rounded-md w-[85%]" />

                  <div className="h-5 bg-gray-200 rounded-md w-[60%] mt-2" />

                  {/* RATING */}
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-4 h-4 rounded-sm bg-gray-200"
                      />
                    ))}
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-6 w-20 bg-gray-200 rounded-md" />
                    <div className="h-5 w-16 bg-gray-200 rounded-md" />
                  </div>

                </div>

              </div>
            ))}
          </div>

        ) : products.length === 0 ? (

          /* =========================
             NO PRODUCTS
          ========================== */

          <div className="bg-white rounded-[40px] shadow-sm p-20 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={40} className="text-gray-500" />
            </div>

            <h2 className="text-4xl font-black mt-8">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto">
              Try different keywords or explore trending collections curated for you.
            </p>

            <Link
              href="/"
              className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition"
            >
              Explore Products
            </Link>
          </div>

        ) : (

          /* =========================
             PRODUCTS
          ========================== */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">

            {products.map((product) => (

              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="group min-w-0"
              >

                {/* =========================
            IMAGE
        ========================== */}

                <div className="relative
                  aspect-square
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  border
                  border-zinc-200
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:shadow-lg">

                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="
                    w-full
                    h-full
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
            "
                  />

                  {/* HEART BUTTON */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      // Add your wishlist function here later
                      // createwishlist(product._id);
                    }}
               className="absolute top-4 right-4  w-11 h-11  rounded-full  bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 transition"
                  >
                    <Heart
                      size={22}
                      className="text-slate-500"
                    />
                  </button>

                </div>


                {/* =========================
            PRODUCT INFORMATION
        ========================== */}

                <div className="mt-4 px-1">

                  {/* TITLE */}

                  <h2 className="
            text-[17px]
            leading-6
            font-medium
            text-slate-900
            line-clamp-2
          ">
                    {product.title}
                  </h2>


                  {/* =========================
              RATING
          ========================== */}

                  <div className="flex items-center gap-[2px] mt-2">

                    <Star
                      size={16}
                      className="fill-blue-700 text-blue-700"
                    />

                    <Star
                      size={16}
                      className="fill-blue-700 text-blue-700"
                    />

                    <Star
                      size={16}
                      className="fill-blue-700 text-blue-700"
                    />

                    <Star
                      size={16}
                      className="fill-blue-700 text-blue-700"
                    />

                    <Star
                      size={16}
                      className="text-gray-300"
                    />

                  </div>


                  {/* =========================
              PRICE
          ========================== */}

                  <div className="flex items-center gap-2 mt-2">

                    <span className="
              text-[21px]
              font-bold
              text-slate-900
            ">
                      ₹{product.discountPrice ?? product.price}
                    </span>

                    {product.discountPrice && (
                      <span className="
                text-sm
                text-slate-400
                line-through
              ">
                        ₹{product.price}
                      </span>
                    )}

                  </div>

                </div>

              </Link>

            ))}

          </div>
        )}
      </section>
      </section>
    </main>
  );
}

