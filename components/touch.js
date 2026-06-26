"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function ProductGallery({ product }) {
  const images = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

 
  return (
    <div className="bg-white lg:rounded-3xl lg:border lg:border-slate-200 lg:shadow-sm lg:overflow-hidden">

      {/* Main Image */}
      <div
        className="relative h-[280px] sm:h-[320px] lg:h-[450px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[selectedIndex]}
          alt={product.title}
          fill
          priority
          className="object-contain p-4 sm:p-6 transition-all duration-300"
        />

        <button className="absolute top-4 right-4 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border shadow-sm flex items-center justify-center hover:scale-105 transition-all">
          <Heart size={20} />
        </button>

        {/* Dots — only on mobile */}
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

      {/* Thumbnails — only on desktop */}
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
            <Image
              src={img}
              alt={`thumbnail-${index}`}
              fill
              className="object-contain p-1.5"
            />
          </button>
        ))}
      </div>

    </div>
  );
}