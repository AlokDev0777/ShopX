import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    
})

export default mongoose.models.Seller || mongoose.model("Seller", sellerSchema)
