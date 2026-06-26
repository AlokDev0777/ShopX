"use client";



import CategoryStrip from "@/components/categories"; 
import TrustSection from "@/components/trustsection";
import Hero from "@/components/Hero";
import SuggestedProducts from "@/components/suggested";
import HeroSlider from "@/components/heroslider";
import TrendingProducts from "@/components/trending";
import Footer from "@/components/footer";
import Electronics from "@/components/Electronics";
import Fashion from "@/components/Fashion";

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
   <main className="min-h-screen bg-slate-100">

  <Nav />
  <CategoryStrip />

  {/* HERO */}
  <Hero/>

  <SuggestedProducts products={products}/>

  {/* CATEGORIES */}

  {/* TRENDING PRODUCTS */}
  <TrendingProducts products={products} />

   <Electronics products={products}/>

  <Fashion/>

  {/* PROMO BANNER */}


  {/* TRUST */}
  <TrustSection />

  <Footer />

</main>
  );
}