"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { addReview, getReviews } from "@/actions/backend";

const TABS = ["Description", "Additional Information", "Reviews"];

const dummySpecs = [
  { spec: "Brand", detail: "ShopX Originals", info: "Verified Brand", remark: "Trusted" },
  { spec: "Material", detail: "Premium Quality", info: "Grade A Material", remark: "Durable" },
  { spec: "Weight", detail: "320g", info: "Lightweight design", remark: "Portable" },
  { spec: "Dimensions", detail: "18 × 15 × 8 cm", info: "Compact build", remark: "Travel friendly" },
  { spec: "Warranty", detail: "1 Year", info: "Manufacturer warranty", remark: "Extendable" },
  { spec: "In The Box", detail: "1 Unit + Manual", info: "Complete package", remark: "Ready to use" },
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

// Interactive star picker for the review form
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductTabs({ product }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("Description");

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Load reviews when Reviews tab is opened
  useEffect(() => {
    if (activeTab !== "Reviews") return;

    const load = async () => {
      setReviewsLoading(true);
      const result = await getReviews(product._id);
      if (result.success) setReviews(result.reviews);
      setReviewsLoading(false);
    };

    load();
  }, [activeTab, product._id]);

  // Rating summary calculations
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percent:
      reviews.length > 0
        ? `${Math.round(
            (reviews.filter((r) => r.rating === star).length / reviews.length) * 100
          )}%`
        : "0%",
  }));

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setFormError("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      setFormError("Please write a comment");
      return;
    }
    if (!session?.user?.email) {
      setFormError("Please login to submit a review");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const result = await addReview(
      product._id,
      session.user.email,
      rating,
      comment.trim()
    );

    if (result.success) {
      setFormSuccess("Review submitted successfully!");
      setRating(0);
      setComment("");
      // Reload reviews
      const updated = await getReviews(product._id);
      if (updated.success) setReviews(updated.reviews);
    } else {
      setFormError(result.message);
    }

    setSubmitting(false);
  };

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
              ${activeTab === tab ? "text-[#071633]" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            {tab}
            {tab === "Reviews" && reviews.length > 0 && (
              <span className="ml-1.5 text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">
                {reviews.length}
              </span>
            )}
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
                {(product.specs?.length > 0 ? product.specs : dummySpecs).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
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

            {reviewsLoading ? (
              <div className="text-center py-10 text-slate-400">
                Loading reviews...
              </div>
            ) : (
              <>
                {/* Rating Summary — only show if reviews exist */}
                {reviews.length > 0 && (
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-100 mb-6">
                    <div className="text-center shrink-0">
                      <p className="text-5xl font-bold text-[#071633]">{avgRating}</p>
                      <StarRow rating={Math.round(avgRating)} size={18} />
                      <p className="text-slate-400 text-xs mt-1">
                        {reviews.length} Review{reviews.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {ratingCounts.map(({ star, percent }) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 w-3">{star}</span>
                          <Star size={12} className="fill-yellow-400 text-yellow-400 shrink-0" />
                          <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                            <div
                              className="bg-yellow-400 h-1.5 rounded-full transition-all"
                              style={{ width: percent }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-6">{percent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Write a Review Form */}
                {session?.user ? (
                  <div className="bg-slate-50 rounded-2xl p-5 mb-6">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Write a Review
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Your Rating
                        </label>
                        <StarPicker value={rating} onChange={setRating} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Your Review
                        </label>
                        <textarea
                          rows={4}
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                            setFormError(null);
                            setFormSuccess(null);
                          }}
                          placeholder="Share your experience with this product..."
                          className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                      </div>

                      {formError && (
                        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                          {formError}
                        </div>
                      )}

                      {formSuccess && (
                        <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
                          <CheckCircle size={16} />
                          {formSuccess}
                        </div>
                      )}

                      <button
                        onClick={handleSubmitReview}
                        disabled={submitting}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium text-sm transition"
                      >
                        {submitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-center">
                    <p className="text-slate-500 text-sm">
                      Please login to write a review
                    </p>
                  </div>
                )}

                {/* Individual Reviews */}
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <Star size={40} className="mx-auto mb-3 fill-slate-200 text-slate-200" />
                    <p className="font-medium">No reviews yet</p>
                    <p className="text-sm mt-1">
                      Be the first to review this product
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="pb-5 border-b border-slate-100 last:border-none last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                              <span className="text-blue-600 font-semibold text-sm">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm text-[#071633]">
                                  {review.name}
                                </p>
                                {review.verified && (
                                  <span className="flex items-center gap-1 text-green-600 text-xs">
                                    <CheckCircle size={12} />
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <StarRow rating={review.rating} size={13} />
                            </div>
                          </div>
                          <span className="text-slate-400 text-xs shrink-0">
                            {new Date(review.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-6 mt-2 ml-12">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}