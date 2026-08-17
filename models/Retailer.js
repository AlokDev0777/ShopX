import mongoose from "mongoose";

const retailerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    storeDescription: {
      type: String,
      required: true,
    },

    storeLogo: {
      type: String,
      default: "",
    },

    businessEmail: {
      type: String,
      required: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

      products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  
  totalRevenue: { type: Number, default: 0 },


    approved: {
      type: Boolean,
      default: true,
    },

  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Retailer || mongoose.model("Retailer", retailerSchema);