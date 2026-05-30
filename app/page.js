"use client";


import PromoBanner from "@/components/Promo";
import CategoriesSection from "@/components/categories";
import TrustSection from "@/components/trustsection";
import StatsSection from "@/components/statssection";
import Newsletter from "@/components/newslate";
import HeroSlider from "@/components/heroslider";
import TrendingProducts from "@/components/trending";
import Footer from "@/components/footer";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
   <main className="min-h-screen bg-zinc-200">

  <Nav />

  {/* HERO */}
  <HeroSlider />

  {/* CATEGORIES */}
  <CategoriesSection />

  {/* TRENDING PRODUCTS */}
  <TrendingProducts products={products} />

  {/* PROMO BANNER */}
  <PromoBanner />


  {/* TRUST */}
  <TrustSection />

  {/* STATS */}
  <StatsSection />

  {/* NEWSLETTER */}
  <Newsletter />

  <Footer />

</main>
  );
}