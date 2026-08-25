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
import { checkDb } from "@/actions/backend";

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

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("API DATA:", data);
      console.log("DATA TYPE:", typeof data);
      console.log("IS ARRAY:", Array.isArray(data));

      setProducts(data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
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

  <button className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600" onClick={checkDb}>
    Check DB
  </button>

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