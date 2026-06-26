import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    retailerId: String,
    embedding: [Number],
})

export default mongoose.models.Product || mongoose.model("Product", productSchema)

