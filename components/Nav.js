"use client"
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  User,
  Package,
  MapPin,
  Settings,
  LogOut
} from "lucide-react";

const Nav = () => {
  const [query, setQuery] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();



if (status === "loading") {
  return <div>Loading...</div>;
}


  const handleSearch = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <nav className="sticky mb-0 top-0 z-50 bg-slate-900 backdrop-blur-md border-b border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 rounded-xl">
            <ShoppingCart size={20} />
          </div>
          <h1 className="text-2xl text-white font-bold tracking-tight">
            Shop<span className="text-[#2563EB]">X</span>
          </h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-zinc-100 rounded-full w-full max-w-md overflow-hidden pl-4">
          <Search size={18} className="text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-white ml-2 flex-1 text-[#0F172A] placeholder:text-[#94A3B8] py-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            className="bg-[#2563EB] text-white px-5 py-2 hover:bg-slate-700 transition shrink-0" 
            onClick={handleSearch}
          >
            <Search size={25} className="text-white" />
          </button>
        </div>

        {/* Nav icons */}
        <div className="flex items-center gap-5 text-zinc-500">

          {/* Unauthenticated State */}
          {!session && (
            <Link href="/login" className="border-2 border-[#2563EB] text-[#2563EB] px-4 py-2 rounded-full hover:bg-[#2563EB] hover:text-white hover:border-white transition inline-block text-sm font-medium">
              login
            </Link>
          )}
           
          {/* Authenticated Hover Dropdown State */}
          {session && (
            <div className="relative group inline-block">
              {/* Profile Trigger Button */}

              <Link href="/account/customer">
              <button className="border-2 border-zinc-800 text-zinc-800 w-10 h-10 rounded-full bg-white font-bold transition flex items-center justify-center shadow-sm hover:scale-105 duration-200 focus:outline-none">
                {session.user?.name?.[0]?.toUpperCase() || "A"}
              </button>
              </Link>

              {/* Invisible spacer bridge to protect active hover state transition */}
              <div className="absolute right-0 h-4 w-full top-9 hidden group-hover:block" />

              {/* Dropdown Menu Panel */}
              <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 hidden group-hover:block z-50 overflow-hidden transform origin-top-right transition-all">
                
                {/* User Context Info Header */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">Welcome back,</p>
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {session.user?.name || "User"}
                  </p>
                </div>

                {/* Main Navigation Options */}
                <div className="py-1 text-sm text-slate-700">
                  <Link href="/account/customer" className="flex items-center px-4 py-2.5 hover:bg-slate-50 hover:text-[#2563EB] transition-colors group/item">
                    <User size={16} className="mr-3 text-slate-400 group-hover/item:text-[#2563EB]" />
                    My Account
                  </Link>

                  <Link href="/orders" className="flex items-center px-4 py-2.5 hover:bg-slate-50 hover:text-[#2563EB] transition-colors group/item">
                    <Package size={16} className="mr-3 text-slate-400 group-hover/item:text-[#2563EB]" />
                    My Orders
                  </Link>

                  <Link href="/account/customer/wishlist" className="flex items-center px-4 py-2.5 hover:bg-slate-50 hover:text-[#2563EB] transition-colors group/item">
                    <Heart size={16} className="mr-3 text-slate-400 group-hover/item:text-[#2563EB]" />
                    My Wishlist
                  </Link>

                  <Link href="/address" className="flex items-center px-4 py-2.5 hover:bg-slate-50 hover:text-[#2563EB] transition-colors group/item">
                    <MapPin size={16} className="mr-3 text-slate-400 group-hover/item:text-[#2563EB]" />
                    Addresses
                  </Link>

                  <Link href="/settings" className="flex items-center px-4 py-2.5 hover:bg-slate-50 hover:text-[#2563EB] transition-colors group/item">
                    <Settings size={16} className="mr-3 text-slate-400 group-hover/item:text-[#2563EB]" />
                    Settings
                  </Link>
                </div>

                {/* Log Out Action */}
                <div className="border-t border-slate-100 text-sm">
                  <button 
                    onClick={() => signOut()} 
                    className="w-full flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left font-medium group/btn"
                  >
                    <LogOut size={16} className="mr-3 text-red-500 group-hover/btn:text-red-600" />
                    Logout
                  </button>
                </div>

              </div>
            </div>
          )}

          
          <Link href="/account/customer/cart"><ShoppingCart className="text-white/90 cursor-pointer hover:text-blue-600 transition" /></Link>
          <Menu className="md:hidden cursor-pointer text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;