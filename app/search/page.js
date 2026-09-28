"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import Nav from "@/components/Nav";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [query]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });

      const data = await res.json();

      setProducts(data.products);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f6f7]">

      <Nav />
      {/* ================= HERO SEARCH SECTION ================= */}

      <section className="relative overflow-hidden border-b border-gray-200 bg-white">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
          {/* Top badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles size={15} />
              AI Powered Search
            </div>

            <div className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium">
              Premium Collection
            </div>

            <div className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium">
              {products.length} Results Found
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-gray-500 font-medium mb-4">
                Search Results For
              </p>

              <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] text-gray-900 capitalize">
                {query}
              </h1>

              <p className="text-lg text-gray-500 mt-6 leading-relaxed max-w-xl">
                Discover premium curated products with modern designs,
                exceptional quality, and the best shopping experience.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-5 mt-8">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Truck size={18} className="text-blue-600" />
                  Free Shipping
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <ShieldCheck size={18} className="text-green-600" />
                  Secure Payments
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <RotateCcw size={18} className="text-orange-500" />
                  Easy Returns
                </div>
              </div>

              {/* Search Box */}
              <div className="mt-10 bg-white shadow-xl border border-gray-100 rounded-3xl p-3 flex items-center">
                <Search className="text-gray-400 ml-3" size={22} />

                <input
                  type="text"
                  value={query || ""}
                  readOnly
                  className="w-full bg-transparent px-4 py-3 outline-none text-lg font-medium"
                />

                <button className="bg-black hover:bg-blue-600 transition text-white px-8 py-4 rounded-2xl font-semibold">
                  Search
                </button>
              </div>
            </div>

            {/* Right Featured Card */}
            <div className="hidden lg:block">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1400&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt=""
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 text-white">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit text-sm mb-5">
                    Trending Collection
                  </div>

                  <h2 className="text-4xl font-black leading-tight">
                    Elevate Your <br /> Style Instantly
                  </h2>

                  <p className="text-gray-200 mt-4 max-w-md">
                    Explore premium fashion and lifestyle products designed for
                    modern aesthetics.
                  </p>

                  <button className="mt-7 bg-white text-black px-7 py-4 rounded-2xl font-bold hover:scale-105 transition">
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER + PRODUCTS ================= */}

      <section className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Filter Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-black text-gray-900">
              Curated Products
            </h2>

            <p className="text-gray-500 mt-2">
              Premium handpicked results matching your search.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-white border border-gray-200 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <button className="bg-white border border-gray-200 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              Latest
              <ChevronDown size={18} />
            </button>

            <button className="bg-white border border-gray-200 px-5 py-3 rounded-2xl flex items-center gap-3 font-medium hover:shadow-lg transition">
              Price
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* PRODUCT GRID */}

        {loading ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-4xl overflow-hidden animate-pulse"
              >
                <div className="h-80 bg-gray-200"></div>

                <div className="p-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>

                  <div className="h-4 bg-gray-200 rounded mt-4"></div>

                  <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>

                  <div className="flex justify-between mt-8">
                    <div className="h-7 w-24 bg-gray-200 rounded"></div>

                    <div className="h-12 w-28 bg-gray-200 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-[40px] shadow-sm p-20 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={40} className="text-gray-500" />
            </div>

            <h2 className="text-4xl font-black mt-8">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-4 text-lg max-w-lg mx-auto">
              Try different keywords or explore trending collections curated for
              you.
            </p>

            <button className="mt-8 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition">
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-[32px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-500"
              >
                {/* IMAGE SECTION */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[340px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                  {/* Wishlist */}
                  <button className="absolute top-5 right-5 bg-white/90 backdrop-blur-md p-3 rounded-full hover:bg-red-500 hover:text-white transition">
                    <Heart size={18} />
                  </button>

                  {/* Tag */}
                  <div className="absolute top-5 left-5 bg-black text-white px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                    PREMIUM
                  </div>

                  {/* Quick Add */}
                  <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition duration-500">
                    <button className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-black hover:text-white transition">
                      Quick Add To Cart
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} />
                    </div>

                    <span className="text-sm text-gray-400 font-medium">
                      In Stock
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">
                    {product.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 mt-3 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-end justify-between mt-7">
                    <div>
                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.price + 999}
                      </p>

                      <h3 className="text-3xl font-black text-gray-900">
                        ₹{product.price}
                      </h3>
                    </div>

                    <button className="bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-blue-600 transition">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// "use client"

// import { useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react"

// export default function SearchPage() {

//   const searchParams = useSearchParams()

//   const query = searchParams.get("q")

//   const [products, setProducts] = useState([])



//   useEffect(() => {

//     fetchProducts()

//   }, [query])



//   const fetchProducts = async () => {

//     const res = await fetch("/api/ai-search", {

//       method: "POST",

//       headers: {
//         "Content-Type": "application/json"
//       },

//       body: JSON.stringify({
//         query
//       })

//     })

//     const data = await res.json()

//     setProducts(data.products)

//   }



//   return (

//     <div>

//       <h1>Search Results for {query}</h1>

//       <div className="grid grid-cols-4 gap-5">

//         {products.map((product) => (

//           <div key={product._id}>

//             <img src={product.image} />

//             <h2>{product.title}</h2>

//             <p>{product.price}</p>

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }