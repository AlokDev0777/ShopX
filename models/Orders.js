import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },   // snapshot at time of purchase
  image: { type: String, required: true },   // snapshot at time of purchase
  price: { type: Number, required: true },   // snapshot at time of purchase
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [orderItemSchema],

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  // Razorpay fields
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, default: null },
  razorpaySignature: { type: String, default: null },

  isPaid: { type: Boolean, default: false },

  // Delivery address snapshot
  deliveryAddress: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);