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
      console.log("IS PRODUCTS ARRAY:", Array.isArray(data.products));

      if (!response.ok) {
        console.error("API ERROR:", data.error);
        setProducts([]);
        return;
      }

      if (!Array.isArray(data.products)) {
        console.error("Expected products to be an array:", data);
        setProducts([]);
        return;
      }

      setProducts(data.products);

    } catch (error) {
      console.error("FETCH ERROR:", error);
      setProducts([]);
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