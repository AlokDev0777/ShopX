import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const specSchema = new mongoose.Schema({
  key: { type: String,
        required: true,
   },
  detail: { type: String,
        required: true,
   },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: null },
  brand: { type: String, default: "" },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  images: [{ type: String }],
  highlights: [{ type: String }],
  specs: [specSchema],
  reviews: [reviewSchema],
  retailer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);