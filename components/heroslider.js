"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    title: "Latest Electronics",
    subtitle: "Discover cutting-edge gadgets and devices.",
    button: "Shop Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400",
  },
  {
    title: "Fashion Collection",
    subtitle: "Upgrade your wardrobe with premium styles.",
    button: "Explore Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400",
  },
  {
    title: "Fitness Essentials",
    subtitle: "Everything you need for a healthier lifestyle.",
    button: "Shop Fitness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400",
  },
  {
    title: "Home & Living",
    subtitle: "Transform your home with beautiful products.",
    button: "Explore Home",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400",
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
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">

      {/* Slider Track */}
      <div
        className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="min-w-full"
          >
            <div className="max-w-7xl mx-auto px-6 py-16">

              <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT CONTENT */}
                <div className="space-y-8">

                  <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                    Featured Collection
                  </span>

                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                    {banner.title}
                  </h1>

                  <p className="text-gray-300 text-lg">
                    {banner.subtitle}
                  </p>

                  <div className="flex gap-4">

                    <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold">
                      {banner.button}
                    </button>

                    <button className="px-8 py-4 rounded-xl border border-gray-600 text-white hover:bg-white hover:text-black transition">
                      Learn More
                    </button>

                  </div>
                </div>

                {/* IMAGE */}
                <div className="relative">

                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-[500px] object-cover rounded-3xl"
                  />

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/30 to-transparent" />

                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-black"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-black"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-10 h-3 bg-blue-500"
                : "w-3 h-3 bg-white/40"
            }`}
          />
        ))}

      </div>

    </section>
  );
}