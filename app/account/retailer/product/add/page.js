"use client";

import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">

        <div className="flex items-center gap-4">

          <Link
            href="/account/retailer/products"
            className="w-12 h-12 rounded-2xl border flex items-center justify-center hover:bg-slate-50 transition"
          >
            <ArrowLeft size={22} />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Add Product
            </h1>

            <p className="text-slate-500 mt-1">
              Fill in the details to add a new product.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}
      <form className="space-y-8">

        {/* Product Information */}
        <div className="bg-white rounded-3xl shadow-sm p-8">

          <h2 className="text-xl font-bold mb-6">
            Product Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Product Name */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Brand
              </label>

              <input
                type="text"
                placeholder="Enter brand name"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Category
              </label>

              <select className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Beauty</option>
                <option>Groceries</option>
                <option>Accessories</option>
                <option>Gaming</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Stock Quantity
              </label>

              <input
                type="number"
                placeholder="0"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Price
              </label>

              <input
                type="number"
                placeholder="₹0"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount Price */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Discount Price
              </label>

              <input
                type="number"
                placeholder="₹0"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">

            <label className="block mb-2 font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Write product description..."
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* Upload Images */}
        <div className="bg-white rounded-3xl shadow-sm p-8">

          <h2 className="text-xl font-bold mb-6">
            Product Images
          </h2>

          <label className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition">

            <Upload
              size={40}
              className="text-blue-600 mb-4"
            />

            <h3 className="font-semibold text-slate-900">
              Upload Product Images
            </h3>

            <p className="text-slate-500 mt-2">
              PNG, JPG up to 5MB
            </p>

            <input
              type="file"
              multiple
              className="hidden"
            />

          </label>

        </div>

        {/* Save */}
        <div className="flex justify-end">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-semibold transition"
          >
            Save Product
          </button>

        </div>

      </form>

    </div>
  );
}