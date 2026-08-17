"use client";

import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { wishlist, showWishlist } from "@/actions/backend";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function TrendingProducts({ products }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const { data: session } = useSession();

  const createwishlist = async (productId) => {
    if (!session?.user?.email) return;

    const result = await wishlist(
      productId,
    );

    if (result.isWishlisted) {
      setWishlistIds((prev) => [
        ...prev,
        productId.toString(),
      ]);
    } else {
      setWishlistIds((prev) =>
        prev.filter(
          (id) => id !== productId.toString()
        )
      );
    }
  };

  useEffect(() => {
    const loadWishlist = async () => {
      if (!session?.user?.email) return;

      const data = await showWishlist(
      );

      setWishlistIds(
        data.wishlist.map((item) =>
          item._id.toString()
        )
      );
    };

    loadWishlist();
  }, [session]);

  return (
    <section className="max-w-7xl mx-auto overflow-x-hidden px-6 mt-18">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-inter font-bold text-slate-900">
          Todays Best Deals For You!
        </h2>

        <button className="text-blue-600 font-semibold">
          View All →
        </button>
      </div>

      <div className="flex gap-3 pb-4">
        {products?.slice(0, 5).map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="group shrink-0 w-59"
          >
            <div>
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
                  src={product.images[0]}
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

                <button
                  className="absolute top-3 right-3 h-10 w-10 rounded-full bg-slate-200 shadow-md flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    createwishlist(product._id);
                  }}
                >
                  <Heart
                    className={
                      wishlistIds.includes(
                        product._id.toString()
                      )
                        ? "fill-black text-black"
                        : "text-gray-500"
                    }
                  />
                </button>
              </div>

              <div className="mt-3">
                <h3
                  className="
                    mt-1
                    font-roboto
                    text-base
                    text-slate-900
                    line-clamp-2
                  "
                >
                  {product.title}
                </h3>

                <div className="mt-2 flex gap-0.5">
                  <Star size={15} className="fill-blue-800" />
                  <Star size={15} className="fill-blue-800" />
                  <Star size={15} className="fill-blue-800" />
                  <Star size={15} className="fill-blue-800" />
                  <Star size={15} />
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-inter font-extrabold text-slate-900">
                    ₹{product.price}
                  </span>

                  <span className="text-slate-400 line-through">
                    ₹{Math.round(product.price * 1.3)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}