"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { wishlist, checkWishlist } from "@/actions/backend";
import { useSession } from "next-auth/react";
import { addToCart } from "@/actions/backend";

export default function ProductGallery({ product }) {
  const { data: session } = useSession();
  const [Iswishlisted, setIswishlisted] = useState(false)

    useEffect(() => {
    if (!session?.user?.email) return;

    const fetchWishlistStatus = async () => {
      const result = await checkWishlist(product._id);
      setIswishlisted(result.isWishlisted);
    };

    fetchWishlistStatus();
  }, [session, product._id]);

  const createwishlist = async (productId, email) => {
    console.log("Product:", product);
    console.log("Session:", session);
    if (!session?.user?.email) return;

    const result = await wishlist(
      productId,
      email
    );

    console.log("Server returned:", result);

    if (result.isWishlisted == false) {
      setIswishlisted(false);
      console.log("Setting FALSE");
    } else {
      setIswishlisted(true);
      console.log("Setting TRUE");
    }
  };
const images =
    product.images?.length
        ? product.images
        : ["/placeholder.png"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -50) {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;



  };



  console.log(product.images);
console.log(images);
console.log(images[selectedIndex]);
 

  return (
    <div className="bg-white lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm overflow-hidden">

      {/* Main Image */}
      <div
        className="relative h-[280px] sm:h-[350px] lg:h-[450px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[selectedIndex]}
          alt={product.title}
          className="object-contain p-4 sm:p-6 transition-all duration-300"
        />

        <button onClick={() => { createwishlist(product._id) }} className="absolute top-4 right-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border shadow-sm flex items-center justify-center hover:scale-105 transition-all">
          <Heart
            className={
              Iswishlisted
                ? "fill-black text-black"
                : "text-gray-500"
            }
          />
        </button>

        {/* Dots — mobile only */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`
                rounded-full transition-all duration-300
                ${selectedIndex === index
                  ? "bg-blue-600 w-5 h-2"
                  : "bg-slate-300 w-2 h-2"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails — desktop only */}
      <div className="hidden lg:flex gap-3 p-4 border-t overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`
              relative h-20 w-20
              rounded-xl overflow-hidden
              border-2 shrink-0 transition-all
              ${selectedIndex === index ? "border-blue-600" : "border-slate-200"}
            `}
          >
            <img
              src={img}
              alt={`thumbnail-${index}`} 
              className="object-contain p-1.5"
            />
          </button>
        ))}
      </div>

    </div>
  );
}

