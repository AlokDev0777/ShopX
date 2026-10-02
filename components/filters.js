"use client";
import React from 'react'

import { useEffect, useState } from "react";

import {
  Star,
} from "lucide-react";



const Filters = () => {

    const [filterRating, setfilterRating] = useState(0)
  return (
         <section className="w-64 max-h-[70vh] sticky top-40 bg-white shadow-lg rounded-2xl p-4">
       
       <h2 className="text-xl font-semibold text-slate-700" >Filters</h2>

       <div className="bg-gray-100 h-0.5"></div>
       
       <div>
       <h2 className="text-lg font-semibold text-slate-700 mt-4">Price</h2>
          <ul className="list-inside text-slate-600 mt-3">
        <li><input type="checkbox" name="brand" id="brand1" /> Brand 1</li>
        <li><input type="checkbox" name="brand" id="brand2" /> Brand 2</li>
        <li><input type="checkbox" name="brand" id="brand3" /> Brand 3</li>
        <li><input type="checkbox" name="brand" id="brand4" /> Brand 4</li>
       </ul>
       </div>

       <div>
       <h2 className="text-lg font-semibold text-slate-700 mt-4">Brands</h2>
       <ul className="list-inside text-slate-600 mt-3">
        <li><input type="checkbox" name="brand" id="brand1" /> Brand 1</li>
        <li><input type="checkbox" name="brand" id="brand2" /> Brand 2</li>
        <li><input type="checkbox" name="brand" id="brand3" /> Brand 3</li>
        <li><input type="checkbox" name="brand" id="brand4" /> Brand 4</li>
       </ul>
       </div>

       
        <h2 className="text-lg font-semibold text-slate-700 mt-4"></h2>
       
                
        
        </section>
  )
}

export default Filters