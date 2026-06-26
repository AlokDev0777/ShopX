"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const banners = [
  {
    image: "/ecommerce.png",
    alt: "Ecommerce Banner",
  },
  {
    image: "/phone.png",
    alt: "Phone Banner",
  },
  {
    image: "/grocery.png",
    alt: "Grocery Banner",
  },
  {
    image: "/fashion.png",
    alt: "Fashion Banner",
  },


];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-[90%] md:h-[25vw] max-w-7xl mx-auto">

      {/* Banner Container */}
      <div className="relative overflow-hidden rounded-4xl w-full h-full">

        {/* Slider Track */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={index}
              className="relative min-w-full h-full"
            >
              <Image src={banner.image} alt={banner.alt} fill priority={index === 0} className="object-cover object-center" sizes="(max-width: 768px) 100vw, 90vw"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-full text-white transition" >
          <ChevronLeft size={26} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20  bg-black/40  hover:bg-black/60 backdrop-blur-md p-3 rounded-full  text-white transition" >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-5">
        <div className="flex gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                transition-all duration-300 rounded-full
                ${
                  current === index
                    ? "w-6 h-2 bg-blue-600"
                    : "w-2 h-2 bg-gray-400"
                }
              `}
            />
          ))}
        </div>
      </div>

    </section>
  );
}