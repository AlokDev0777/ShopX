"use client";

import { useState } from "react";
import { ArrowLeft, ImagePlus, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/actions/backend";
import Retailersidebar from "@/components/retailersidebar";

const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Groceries",
  "Accessories",
  "Gaming",
];

export default function AddProductPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // images — array of { file, url }
  const [previewImages, setPreviewImages] = useState([]);

  // highlights — array of strings
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  // specs — array of { key, detail }
  const [specs, setSpecs] = useState([
    { key: "", detail: "" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    discountPrice: "",
    description: "",
  });

  // ── Handlers ──────────────────────────────────────

  const handleChange = (e) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + previewImages.length > 4) {
      setError("Maximum 4 images allowed");
      return;
    }

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setError(null);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Highlights
  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    if (highlights.length >= 6) {
      setError("Maximum 6 highlights allowed");
      return;
    }
    setHighlights((prev) => [...prev, highlightInput.trim()]);
    setHighlightInput("");
    setError(null);
  };

  const removeHighlight = (index) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // Specs
  const addSpecRow = () => {
    if (specs.length >= 8) {
      setError("Maximum 8 spec rows allowed");
      return;
    }
    setSpecs((prev) => [...prev, { key: "", detail: "" }]);
  };

  const removeSpecRow = (index) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, value) => {
    setSpecs((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // ── Validation ─────────────────────────────────────

  const validate = () => {
    if (!formData.title.trim()) return "Product name is required";
    if (!formData.brand.trim()) return "Brand is required";
    if (!formData.category) return "Please select a category";
    
    const stockNum = Number(formData.stock);
    if (!formData.stock || isNaN(stockNum) || stockNum < 0)
      return "Valid non-negative stock quantity is required";
    
    const priceNum = Number(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0)
      return "Valid price greater than 0 is required";
    
    if (formData.discountPrice) {
      const discountNum = Number(formData.discountPrice);
      if (isNaN(discountNum) || discountNum < 0) 
        return "Discount price cannot be negative";
      if (discountNum >= priceNum) 
        return "Discount price must be less than original price";
    }
    
    if (!formData.description.trim()) return "Description is required";
    if (previewImages.length === 0) return "Please upload at least one image";

    // Validate spec fields for incomplete data
    for (const row of specs) {
      const hasKey = !!row.key.trim();
      const hasDetail = !!row.detail.trim();
      if ((hasKey && !hasDetail) || (!hasKey && hasDetail)) {
        return "Incomplete specification row found. Fill both fields or remove the row.";
      }
    }

    return null;
  };

  // ── Submit ─────────────────────────────────────────

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("brand", formData.brand.trim());
      data.append("category", formData.category);
      data.append("stock", String(Number(formData.stock)));
      data.append("price", String(Number(formData.price)));
      data.append("discountPrice", formData.discountPrice ? String(Number(formData.discountPrice)) : "");
      data.append("description", formData.description.trim());
      data.append("retailerId", session?.user?.retailerId || "");
      
      // Clean up inputs on submission
      const activeHighlights = highlights.filter(h => h.trim());
      data.append("highlights", JSON.stringify(activeHighlights));
      
      const activeSpecs = specs.filter(row => row.key.trim() && row.detail.trim());
      data.append("specs", JSON.stringify(activeSpecs));

      // Append files safely
      previewImages.forEach(({ file }) => {
        data.append("images", file);
      });

      const result = await addProduct(data);

      if (result.success) {
        router.push("/account/retailer/product");
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── UI ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Retailersidebar />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 flex items-center gap-4">
          <Link
            href="/account/retailer/product"
            className="w-11 h-11 rounded-2xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shrink-0"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add Product</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Fill in the details to list a new product.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* ── LEFT ── */}
          <div className="space-y-6">
            {/* Product Information */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Product Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. ASUS Gaming Laptop V16"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g. ASUS, Nike, Sony"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Stock Qty <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Discount Price (₹)
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      placeholder="Optional"
                      min="0"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your product..."
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Product Images <span className="text-red-500">*</span>
                </h2>
                <span className="text-sm text-slate-400">
                  {previewImages.length}/4
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {previewImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={img.url}
                      alt={`preview-${index}`}
                      className="w-full h-full object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white shadow border flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <X size={13} className="text-red-500" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Main
                      </span>
                    )}
                  </div>
                ))}

                {previewImages.length < 4 && (
                  <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer transition group">
                    <ImagePlus
                      size={24}
                      className="text-slate-300 group-hover:text-blue-500 transition"
                    />
                    <span className="text-xs text-slate-400 mt-1.5">
                      Add Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-3">
                First image will be the main product image. Max 4 images, PNG or JPG up to 5MB each.
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Highlights
              </h2>

              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addHighlight()}
                  placeholder="e.g. Premium Quality Product"
                  className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {highlights.length > 0 && (
                <div className="space-y-2">
                  {highlights.map((h, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3"
                    >
                      <span className="text-slate-700 text-sm">{h}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="text-red-400 hover:text-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {highlights.length === 0 && (
                <p className="text-slate-400 text-sm">
                  No highlights added yet. Add up to 6.
                </p>
              )}
            </div>

            {/* Specs */}
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Additional Information
                </h2>
                <button
                  type="button"
                  onClick={addSpecRow}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  <Plus size={16} />
                  Add Row
                </button>
              </div>

              <div className="space-y-3">
                {/* Header */}
                <div className="hidden sm:grid grid-cols-2 gap-3 px-1">
                  {["Specification", "Details"].map((h) => (
                    <span key={h} className="text-xs font-medium text-slate-400">
                      {h}
                    </span>
                  ))}
                </div>

                {specs.map((row, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      {["key", "detail"].map((field) => (
                        <input
                          key={field}
                          type="text"
                          value={row[field]}
                          onChange={(e) =>
                            handleSpecChange(index, field, e.target.value)
                          }
                          placeholder={
                            field === "key" ? "e.g. Weight" : "e.g. 320g"
                          }
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpecRow(index)}
                      className="shrink-0 w-9 h-9 rounded-xl hover:bg-red-50 flex items-center justify-center transition"
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Summary ── */}
          <div>
            <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name</span>
                  <span className="font-medium text-slate-800 text-right max-w-35 truncate">
                    {formData.title || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Brand</span>
                  <span className="font-medium text-slate-800">
                    {formData.brand || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="font-medium text-slate-800">
                    {formData.category || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Stock</span>
                  <span className="font-medium text-slate-800">
                    {formData.stock || "—"}
                  </span>
                </div>

                <hr className="border-slate-100" />

                <div className="flex justify-between">
                  <span className="text-slate-500">Price</span>
                  <span className="font-bold text-slate-900">
                    {formData.price ? `₹${formData.price}` : "—"}
                  </span>
                </div>

                {formData.discountPrice && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Discount</span>
                    <span className="font-bold text-green-600">
                      ₹{formData.discountPrice}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-500">Images</span>
                  <span className="font-medium text-slate-800">
                    {previewImages.length}/4
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Highlights</span>
                  <span className="font-medium text-slate-800">
                    {highlights.length} added
                  </span>
                </div>
              </div>

              {error && (
                <div className="mt-5 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3.5 rounded-2xl font-semibold transition"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>

              <Link
                href="/account/retailer/product"
                className="mt-3 w-full border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 rounded-2xl font-medium transition flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}