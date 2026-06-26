"use client";

import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Package,
} from "lucide-react";

const products = [
  {
    id: 1,
    image: "/products/laptop.png",
    name: "ASUS Gaming Laptop",
    category: "Electronics",
    price: "₹49,999",
    stock: 12,
  },
  {
    id: 2,
    image: "/products/cream.png",
    name: "Vitamin C Face Cream",
    category: "Beauty",
    price: "₹299",
    stock: 45,
  },
  {
    id: 3,
    image: "/products/watch.png",
    name: "Smart Watch",
    category: "Accessories",
    price: "₹2,999",
    stock: 5,
  },
  {
    id: 4,
    image: "/products/headphones.png",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "₹3,499",
    stock: 0,
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Products
            </h1>

            <p className="text-slate-500 mt-2">
              Manage all products in your store.
            </p>
          </div>

          <Link
            href="/account/retailer/products/add"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-2xl flex items-center gap-2 w-fit"
          >
            <Plus size={20} />

            Add Product
          </Link>

        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm mt-8 overflow-x-auto">

        <table className="w-full min-w-[800px]">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="p-6">Product</th>
              <th className="p-6">Category</th>
              <th className="p-6">Price</th>
              <th className="p-6">Stock</th>
              <th className="p-6">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b last:border-0 hover:bg-slate-50 transition"
              >

                {/* Product */}
                <td className="p-6">

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">

                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="text-slate-400" />
                      )}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ID: #{product.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Category */}
                <td className="p-6 text-slate-700">
                  {product.category}
                </td>

                {/* Price */}
                <td className="p-6 font-semibold text-slate-900">
                  {product.price}
                </td>

                {/* Stock */}
                <td className="p-6">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock === 0
                        ? "bg-red-100 text-red-700"
                        : product.stock <= 10
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of Stock"
                      : `${product.stock} in stock`}
                  </span>

                </td>

                {/* Action */}
                <td className="p-6">

                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">

                    <Pencil size={18} />

                    Edit

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}