"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { addToCart } from '@/actions/backend';
import { useRouter } from 'next/navigation';

import {
  ShoppingCart,
  Store,
  Truck,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Star,
  BadgeCheck,
  RotateCcw,
} from "lucide-react";



const Rightside = ({ product }) => {
  const { data: session } = useSession();
  const [IsVisible, setIsVisible] = useState(false)
  const timer = useRef(null)
  const router = useRouter()
  const cart = async (productId) => {
    if (!session?.user?.email) return;
    const a = await addToCart(productId)
    
    if(a.success){
      setIsVisible(true)  
      if (timer.current) {
      clearTimeout(timer.current);
    }

    // 3. Set a timer to hide the component after 3 seconds (3000ms)
    timer.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };


    }

    
  

  return (
    <div className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-5 sm:p-6 lg:p-0">

      {/* Category */}
      <span className="text-blue-700 text-xs sm:text-sm font-medium">
        {product.category}
      </span>

      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-medium text-[#071633] mt-2 leading-snug">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className="fill-yellow-400 text-yellow-400 sm:w-4.5 sm:h-4.5"
            />
          ))}
        </div>
        <span className="text-slate-500 text-sm">
          (248 Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mt-5">
        <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#071633]">
          ₹{product.price}
        </span>
        <span className="text-base sm:text-xl text-slate-400 line-through">
          ₹{Math.round(product.price * 1.5)}
        </span>
        <span className="text-green-600 font-semibold text-sm sm:text-base">
          20% OFF
        </span>
      </div>


      {/* Highlights */}
      <div className="mt-6">
        <h3 className="font-bold text-slate-800 text-base sm:text-lg mb-3">
          Highlights
        </h3>
        <div className="space-y-2.5">
          <div className="flex text-slate-700 items-center gap-2.5 text-sm sm:text-base">
            <BadgeCheck size={16} className="text-green-600 shrink-0" />
            Premium Quality Product
          </div>
          <div className="flex text-slate-700 items-center gap-2.5 text-sm sm:text-base">
            <BadgeCheck size={16} className="text-green-600 shrink-0" />
            Trusted Marketplace Seller
          </div>
          <div className="flex text-slate-700 items-center gap-2.5 text-sm sm:text-base">
            <BadgeCheck size={16} className="text-green-600 shrink-0" />
            Secure Checkout Experience
          </div>
        </div>
      </div>

      {/* Seller */}
      {/* <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Store className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Sold By</p>
                    <h4 className="font-semibold text-sm sm:text-base">
                      TechStore Official
                    </h4>
                  </div>
                </div>
              </div> */}

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
        <div className="flex flex-col bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
          <Truck className="mx-auto text-green-600" size={20} />
          <p className="text-xs text-slate-700 mt-1.5">Fast Delivery</p>
        </div>
        <div className="flex flex-col bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
          <ShieldCheck className="mx-auto text-green-600" size={20} />
          <p className="text-xs text-slate-700 mt-1.5">Secure Pay</p>
        </div>
        <div className="flex flex-col bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
          <RotateCcw className="mx-auto text-green-600" size={20} />
          <p className="text-xs text-slate-700 mt-1.5">Easy Returns</p>
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-3">
          Quantity
        </h3>
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 text-slate-700 sm:h-12 sm:w-12 rounded-xl bg-slate-100 border-gray-300 border shadow-sm text-lg font-medium">
            -
          </button>
          <span className="font-bold text-slate-700 text-base sm:text-lg">1</span>
          <button className="h-10 w-10 text-slate-700 sm:h-12 sm:w-12 rounded-xl bg-slate-100 border-gray-300 border shadow-sm text-lg font-medium">
            +
          </button>
        </div>
      </div>

      {IsVisible && <div className="fixed top-20 inset-x-0 mx-auto w-fit z-50 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-sm transition-all animate-in fade-in slide-in-from-top-4 duration-300">
  <CheckCircle size={18} className="text-green-400 fill-green-500/10" />
  <span>Added to your cart</span>
</div> }
       
     

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        <button onClick={() => {
          if (!session?.user?.email) return;
          cart(product._id)
        }} className="w-full bg-[#071633] hover:bg-[#0b224d] text-white py-3.5 sm:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base">
          <ShoppingCart size={18} />
          Add To Cart
        </button>
        <button
          onClick={() => {
            if (!session?.user?.email) return;
            router.push(`/checkout?type=buynow&productId=${product._id}`);
          }}
          className="w-full bg-[#2563FF] hover:bg-[#1d4ed8] text-white py-3.5 sm:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
        >
          Buy Now
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Trust Badges */}


    </div>
  )
}

export default Rightside