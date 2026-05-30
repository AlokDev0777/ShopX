import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
} from "lucide-react";

const Nav = () => {
  const [query, setQuery] = useState("")

  const router = useRouter()

const handleSearch = () => {

  router.push(`/search?q=${query}`)

}

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 rounded-xl">
            <ShoppingCart size={20} />
          </div>

          <h1 className="text-2xl text-zinc-400 font-bold tracking-tight">
            Shop<span className="text-blue-600">X</span>
          </h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-zinc-100 px-4 py-2 rounded-full w-100">
          <Search size={18} className="text-gray-500" />


          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none ml-2 w-full text-gray-500 placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

        <button className='bg-slate-800 text-white px-4 py-2 rounded-full hover:bg-slate-700 transition' onClick={handleSearch}>
          Search
        </button>

        </div>

        {/* Nav icons */}
        <div className="flex items-center gap-5 text-zinc-500">
          <Heart className="cursor-pointer hover:text-red-500 transition" />
          <ShoppingCart className="cursor-pointer hover:text-blue-600 transition" />
          <Menu className="md:hidden cursor-pointer" />
        </div>
      </div>
    </nav>
  )
}

export default Nav