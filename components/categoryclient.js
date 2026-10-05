"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag } from "lucide-react";
import Filters from "./filters";



export default function CategoryClient({ products, category }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <section className="bg-slate-100 relative flex flex-1 gap-[1vw] px-[1vw] items-start">

      {/* FILTER */}
      <Filters
        products={products}
        onFilterChange={setFilteredProducts}
      />

      {/* PRODUCTS */}
      <section className="flex-1 min-w-0 px-6 py-14">

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category} Products
            </h2>

            <p className="text-gray-500 mt-1">
              {filteredProducts.length} products
            </p>
          </div>

        </div>

        {filteredProducts.length === 0 ? (

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

            <p className="text-gray-500 mt-4 text-lg">
              No products match your current filters.
            </p>

            <button
              type="button"
              onClick={() => setFilteredProducts(products)}
              className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">

            {filteredProducts.map((product) => (

              <Link
                href={`/product/${product._id}`}
                key={product._id}
                className="group min-w-0"
              >

                <div className="relative aspect-square overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 group-hover:shadow-lg">

                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-110 transition"
                  >
                    <Heart
                      size={22}
                      className="text-slate-500"
                    />
                  </button>

                </div>

                <div className="mt-4 px-1">

                  <h2 className="text-[17px] leading-6 font-medium text-slate-900 line-clamp-2">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-[2px] mt-2">

                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-blue-700 text-blue-700"
                      />
                    ))}

                    <Star
                      size={16}
                      className="text-gray-300"
                    />

                  </div>

                  <div className="flex items-center gap-2 mt-2">

                    <span className="text-[21px] font-bold text-slate-900">
                      ₹{product.discountPrice ?? product.price}
                    </span>

                    {product.discountPrice && (
                      <span className="text-sm text-slate-400 line-through">
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
  );
}

