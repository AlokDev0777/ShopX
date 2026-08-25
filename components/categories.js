"use client";

import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Laptop,
  Sparkles,
  Dumbbell,
  House,
  BookOpen,
  ShoppingCart,
  Handbag,
  Gamepad2,
  ToyBrick,
  Trophy,
} from "lucide-react";

const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    slug: "fashion",
  },
  {
    name: "Smartphones",
    icon: Smartphone,
    slug: "smartphones",
  },
  {
    name: "Electronics",
    icon: Laptop,
    slug: "electronics",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    slug: "beauty",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    slug: "fitness",
  },
  {
    name: "Home",
    icon: House,
    slug: "home",
  },
  {
    name: "Books",
    icon: BookOpen,
    slug: "books",
  },
  {
    name: "Grocery",
    icon: ShoppingCart,
    slug: "grocery",
  },
  {
    name: "Accessories",
    icon: Handbag,
    slug: "accessories",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    slug: "gaming",
  },
  {
    name: "Toys",
    icon: ToyBrick,
    slug: "toys",
  },
  {
    name: "Sports",
    icon: Trophy,
    slug: "sports",
  },
];

export default function CategorySection() {
  return (
    <section className="w-full py-2">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center text-center">
                {/* Icon Box */}
                <div
                  className="h-8 w-8 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-center justify-center transition-all *:**:duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <Icon
                    size={15}
                    className="text-slate-700 transition-colors duration-300 group-hover:text-white"/>
                </div>

                {/* Label */}
                <span
                  className="mt-1 text-[12px] font-medium text-slate-700 transition-colorsduration-300 group-hover:text-blue-600">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}