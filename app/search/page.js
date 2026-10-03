"use client";

import { useSearchParams } from "next/navigation";
import Filters from "@/components/filters";
import { useEffect, useState } from "react";

import {
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";

import Nav from "@/components/Nav";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  // ORIGINAL SEARCH RESULTS
  const [products, setProducts] = useState([]);

  // PRODUCTS AFTER FILTERING
  // null = filtering result has not been established yet
  // []   = filtering is complete but there are no matching products
  // [...] = filtered products exist
  const [filteredProducts, setFilteredProducts] = useState(null);

  const [loading, setLoading] = useState(true);

  // ========================================
  // FETCH SEARCH RESULTS
  // ========================================

  useEffect(() => {
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

        if (!res.ok) {
          console.error("AI SEARCH ERROR:", data.error);

          setProducts([]);
          setFilteredProducts([]);

          return;
        }

        const searchResults = Array.isArray(data.products)
          ? data.products
          : [];

        console.log("SEARCH RESULTS:", searchResults);

        // Original products
        setProducts(searchResults);

        // Initially show all search results
        setFilteredProducts(searchResults);

      } catch (error) {
        console.error("FETCH ERROR:", error);

        setProducts([]);
        setFilteredProducts([]);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="min-h-screen bg-[#f6f6f7]">

      <Nav />

      {/* ========================================
          FILTER + PRODUCTS
      ======================================== */}

      <section className="relative flex flex-1 gap-[1vw] px-[1vw] items-start">

        {/* ========================================
            FILTER
        ======================================== */}

        <Filters
          products={products}
          onFilterChange={setFilteredProducts}
        />

        {/* ========================================
            PRODUCTS SECTION
        ======================================== */}

        <section className="flex-1 min-w-0 px-6 py-14">

          {/* ========================================
              SEARCH HEADER
          ======================================== */}

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results for "{query}"
              </h2>
            </div>

          </div>


          {/* ========================================
              LOADING
          ======================================== */}

          {loading ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">

              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

                <div
                  key={item}
                  className="animate-pulse"
                >

                  {/* IMAGE SKELETON */}

                  <div className="relative aspect-square rounded-[28px] bg-gray-200 overflow-hidden">

                    {/* HEART */}

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


          ) : filteredProducts === null ? (

            /* ========================================
               SAFETY STATE
            ======================================== */

            <div className="bg-white rounded-[40px] shadow-sm p-20 text-center">

              <h2 className="text-3xl font-bold">
                Loading results...
              </h2>

            </div>


          ) : filteredProducts.length === 0 ? (

            /* ========================================
               NO PRODUCTS AFTER FILTER
            ======================================== */

            <div className="bg-white rounded-[40px] shadow-sm p-20 text-center">

              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">

                <ShoppingBag
                  size={40}
                  className="text-gray-500"
                />

              </div>


              <h2 className="text-4xl font-black mt-8">
                No Products Found
              </h2>


              <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto">
                No products match your current filters.
              </p>


              <button
                type="button"
                onClick={() => {
                  setFilteredProducts(products);
                }}
                className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition"
              >
                Clear Filters
              </button>

            </div>


          ) : (

            /* ========================================
               PRODUCTS
            ======================================== */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">

              {filteredProducts.map((product) => (

                <Link
                  href={`/product/${product._id}`}
                  key={product._id}
                  className="group min-w-0"
                >

                  {/* ========================================
                      IMAGE
                  ======================================== */}

                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-3xl
                      bg-white
                      border
                      border-zinc-200
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:shadow-lg
                    "
                  >

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


                    {/* HEART */}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="
                        absolute
                        top-4
                        right-4
                        w-11
                        h-11
                        rounded-full
                        bg-white/90
                        backdrop-blur-sm
                        shadow-md
                        flex
                        items-center
                        justify-center
                        hover:scale-110
                        transition
                      "
                    >

                      <Heart
                        size={22}
                        className="text-slate-500"
                      />

                    </button>

                  </div>


                  {/* ========================================
                      PRODUCT INFORMATION
                  ======================================== */}

                  <div className="mt-4 px-1">

                    {/* TITLE */}

                    <h2
                      className="
                        text-[17px]
                        leading-6
                        font-medium
                        text-slate-900
                        line-clamp-2
                      "
                    >
                      {product.title}
                    </h2>


                    {/* RATING */}

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


                    {/* PRICE */}

                    <div className="flex items-center gap-2 mt-2">

                      <span
                        className="
                          text-[21px]
                          font-bold
                          text-slate-900
                        "
                      >
                        ₹{product.discountPrice ?? product.price}
                      </span>


                      {product.discountPrice && (

                        <span
                          className="
                            text-sm
                            text-slate-400
                            line-through
                          "
                        >
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