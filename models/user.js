
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

      retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
        default: null
    },
  
   cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  orders:{
     type: Object
  },

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