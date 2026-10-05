
import { wishlist } from "@/actions/backend";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  }
  ,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: String,


   wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

      retailerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
        default: null
    },
  
   cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
],

  orders:[
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  address:{
     type: String
  },
  
  provider: {
    type: String,
    default: "credentials",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default: Date.now,
  },


});

export default mongoose.models.User || mongoose.model("User", userSchema);