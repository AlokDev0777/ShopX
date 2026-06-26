"use client";

import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";

const TABS = ["Description", "Additional Information", "Reviews"];

const dummySpecs = [
  { spec: "Brand", detail: "ShopX Originals", info: "Verified Brand", remark: "Trusted" },
  { spec: "Material", detail: "Premium Quality", info: "Grade A Material", remark: "Durable" },
  { spec: "Weight", detail: "320g", info: "Lightweight design", remark: "Portable" },
  { spec: "Dimensions", detail: "18 × 15 × 8 cm", info: "Compact build", remark: "Travel friendly" },
  { spec: "Warranty", detail: "1 Year", info: "Manufacturer warranty", remark: "Extendable" },
  { spec: "In The Box", detail: "1 Unit + Manual", info: "Complete package", remark: "Ready to use" },
];

const dummyReviews = [
  { name: "Rahul Sharma", rating: 5, comment: "Absolutely love this product! Build quality is top notch and delivery was super fast. Would definitely recommend to everyone.", date: "12 Jun 2025", verified: true },
  { name: "Priya Mehta", rating: 4, comment: "Great value for money. The product works exactly as described. Only minor issue was the packaging could be better.", date: "3 May 2025", verified: true },
  { name: "Arjun Singh", rating: 5, comment: "Exceeded my expectations. This is my second purchase from ShopX and both times the experience has been excellent.", date: "28 Apr 2025", verified: false },
  { name: "Sneha Kapoor", rating: 3, comment: "Decent product overall. Works fine but I expected slightly better finishing. Customer support was helpful though.", date: "15 Apr 2025", verified: true },
];

function StarRow({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
}

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 px-2 sm:px-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative px-4 sm:px-6 py-4 text-sm sm:text-base font-medium whitespace-nowrap transition-colors
              ${activeTab === tab
                ? "text-[#071633]"
                : "text-slate-400 hover:text-slate-600"
              }
            `}
          >
            {tab}
            {/* Underline indicator */}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563FF] rounded-full transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-8">

        {/* ── DESCRIPTION ── */}
        {activeTab === "Description" && (
          <div className="max-w-3xl tab-content">
            <h2 className="text-lg sm:text-xl font-bold text-[#071633] mb-3">
              About this product
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-7 sm:leading-8">
              {product.description}
            </p>
          </div>
        )}

        {/* ── ADDITIONAL INFORMATION ── */}
        {activeTab === "Additional Information" && (
          <div className="overflow-x-auto tab-content">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-xl font-semibold">Specification</th>
                  <th className="text-left px-4 py-3 font-semibold">Details</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">More Info</th>
                  <th className="text-left px-4 py-3 rounded-tr-xl font-semibold hidden sm:table-cell">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {dummySpecs.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-3 font-medium text-[#071633]">{row.spec}</td>
                    <td className="px-4 py-3 text-slate-600">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{row.info}</td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── REVIEWS ── */}
        {activeTab === "Reviews" && (
          <div className="tab-content">

            {/* Rating Summary */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100 mb-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-[#071633]">4.3</p>
                <StarRow rating={4} size={18} />
                <p className="text-slate-400 text-xs mt-1">248 Reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const widths = { 5: "65%", 4: "20%", 3: "10%", 2: "3%", 1: "2%" };
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-3">{star}</span>
                      <Star size={12} className="fill-yellow-400 text-yellow-400 shrink-0" />
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div
                          className="bg-yellow-400 h-1.5 rounded-full"
                          style={{ width: widths[star] }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-5">
              {dummyReviews.map((review, index) => (
                <div
                  key={index}
                  className="pb-5 border-b border-slate-100 last:border-none last:pb-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-[#071633]">{review.name}</p>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-green-600 text-xs">
                              <CheckCircle size={12} />
                              Verified
                            </span>
                          )}
                        </div>
                        <StarRow rating={review.rating} size={13} />
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs shrink-0">{review.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-6 mt-2 ml-12">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}