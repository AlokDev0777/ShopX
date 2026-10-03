"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const Filters = ({ products = [], onFilterChange }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [rating, setRating] = useState(0);


  // Make sure we always work with an array
  const safeProducts = Array.isArray(products) ? products : [];

  // =========================
  // GET UNIQUE BRANDS
  // =========================

  const brands = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ];
  }, [safeProducts]);

  // =========================
  // GET UNIQUE CATEGORIES
  // =========================

  const categories = useMemo(() => {
    return [
      ...new Set(
        safeProducts
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [safeProducts]);

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    let result = [...safeProducts];

    // CATEGORY


    // BRAND
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // PRICE
    result = result.filter((product) => {
      const price = product.discountPrice ?? product.price;

      if (selectedPrice === "under-1000") {
        return price < 1000;
      }

      if (selectedPrice === "1000-5000") {
        return price >= 1000 && price <= 5000;
      }

      if (selectedPrice === "5000-20000") {
        return price > 5000 && price <= 20000;
      }

      if (selectedPrice === "20000-plus") {
        return price > 20000;
      }

      return true;
    });


    // RATING
    if (rating > 0) {
      result = result.filter((product) => {
        // If your product already has a numeric rating
        if (typeof product.rating === "number") {
          return product.rating >= rating;
        }

        // Otherwise calculate average from reviews
        if (Array.isArray(product.reviews) && product.reviews.length > 0) {
          const validRatings = product.reviews
            .map((review) => Number(review.rating))
            .filter((value) => !Number.isNaN(value));

          if (validRatings.length === 0) {
            return false;
          }

          const average =
            validRatings.reduce((sum, value) => sum + value, 0) /
            validRatings.length;

          return average >= rating;
        }

        return false;
      });
    }

    return result;
  }, [
    safeProducts,
    selectedBrands,
    selectedPrice,
    rating,
  ]);

  // Send filtered products back to parent
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredProducts);
    }
  }, [filteredProducts, onFilterChange]);

  // =========================
  // CLEAR ALL
  // =========================

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory("all");
    setSelectedPrice("all");
    setRating(0);
    setInStockOnly(false);
  };

  // =========================
  // JSX
  // =========================

  return (
    
    <section className="w-74 max-h-[calc(100vh-120px)] rounded-2xl overflow-y-auto sticky top-24 self-start  bg-white shadow-lg rounded-2 p-4">

      {/* HEADER */}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="bg-gray-100 h-0.5 mt-3" />


      {/* =========================
          CATEGORY
      ========================== */}




      {/* =========================
          BRAND
      ========================== */}

      <div className="mt-6">

        <h3 className="text-lg font-semibold text-slate-700">
          Brands
        </h3>

        <div className="space-y-2 mt-3">

          {brands.length === 0 ? (
            <p className="text-sm text-slate-400">
              No brands available
            </p>
          ) : (
            brands.slice(0, 5).map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 text-slate-600 cursor-pointer"
              >

                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    setSelectedBrands((previous) => {
                      if (previous.includes(brand)) {
                        return previous.filter(
                          (item) => item !== brand
                        );
                      }

                      return [...previous, brand];
                    });
                  }}
                />

                {brand}

              </label>
            ))
          )}

        </div>

      </div>


      {/* =========================
          PRICE
      ========================== */}

      <div className="mt-6">

        <h3 className="text-lg font-semibold text-slate-700">
          Price
        </h3>

        <div className="space-y-2 mt-3">

          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === "all"}
              onChange={() => setSelectedPrice("all")}
            />

            All
          </label>

          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === "under-1000"}
              onChange={() => setSelectedPrice("under-1000")}
            />

            Under ₹1,000
          </label>

          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === "1000-5000"}
              onChange={() => setSelectedPrice("1000-5000")}
            />

            ₹1,000 - ₹5,000
          </label>

          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === "5000-20000"}
              onChange={() => setSelectedPrice("5000-20000")}
            />

            ₹5,000 - ₹20,000
          </label>

          <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
            <input
              type="radio"
              name="price"
              checked={selectedPrice === "20000-plus"}
              onChange={() => setSelectedPrice("20000-plus")}
            />

            ₹20,000+
          </label>

        </div>

      </div>


      {/* =========================
          RATING
      ========================== */}

      <div className="mt-6">

        <h3 className="text-lg font-semibold text-slate-700">
          Rating
        </h3>

        <div className="flex items-center gap-0.5 mt-2">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => {
                setRating(star === rating ? 0 : star);
              }}
              className="cursor-pointer"
            >
              <Star
                size={25}
                className={
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}

        </div>

        <p className="text-sm text-slate-500 mt-1">
          {rating === 0
            ? "Any rating"
            : `${rating}★ & above`}
        </p>

      </div>


      {/* =========================
          AVAILABILITY
      ========================== */}

     

    </section>
    
  );
};

export default Filters;