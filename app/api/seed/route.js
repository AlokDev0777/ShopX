"use server"

import connect from "@/db/connectdb";
import Product from "@/models/Product";
import { createEmbedding } from "@/lib/embedding";

export async function GET() {

  await connect();

  await Product.deleteMany();

const products = [
  {
    title: "Apple iPhone 15",
    description: "Latest iPhone with Dynamic Island and A16 chip.",
    price: 79999,
    discountPrice: 74999,
    brand: "Apple",
    stock: 25,
    category: "Smartphones",
    images: [
      "https://placehold.co/600x600?text=iPhone+15",
      "https://placehold.co/600x600?text=iPhone+15+Front",
      "https://placehold.co/600x600?text=iPhone+15+Back"
    ],
    highlights: [
      "A16 Bionic Chip",
      "48MP Camera",
      "Dynamic Island",
      "USB-C"
    ],
    specs: [
      { key: "Display", detail: "6.1 inch OLED" },
      { key: "Storage", detail: "128GB" },
      { key: "Battery", detail: "3349mAh" },
      { key: "OS", detail: "iOS 18" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Samsung Galaxy S25",
    description: "Premium Android flagship smartphone.",
    price: 84999,
    discountPrice: 79999,
    brand: "Samsung",
    stock: 18,
    category: "Smartphones",
    images: [
      "https://placehold.co/600x600?text=Galaxy+S25",
      "https://placehold.co/600x600?text=Galaxy+Display"
    ],
    highlights: [
      "120Hz AMOLED",
      "Snapdragon Processor",
      "50MP Camera",
      "Fast Charging"
    ],
    specs: [
      { key: "Display", detail: "6.7 inch AMOLED" },
      { key: "RAM", detail: "12GB" },
      { key: "Storage", detail: "256GB" },
      { key: "Battery", detail: "4900mAh" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "MacBook Air M3",
    description: "Ultra-thin laptop powered by Apple M3.",
    price: 114999,
    discountPrice: 109999,
    brand: "Apple",
    stock: 12,
    category: "Laptops",
    images: [
      "https://placehold.co/600x600?text=MacBook+Air",
      "https://placehold.co/600x600?text=Keyboard",
      "https://placehold.co/600x600?text=Display"
    ],
    highlights: [
      "Apple M3 Chip",
      "18 Hour Battery",
      "Retina Display",
      "MagSafe"
    ],
    specs: [
      { key: "Processor", detail: "Apple M3" },
      { key: "RAM", detail: "16GB" },
      { key: "Storage", detail: "512GB SSD" },
      { key: "Weight", detail: "1.24kg" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Sony WH-1000XM5",
    description: "Wireless noise cancelling headphones.",
    price: 29999,
    discountPrice: 26999,
    brand: "Sony",
    stock: 40,
    category: "Headphones",
    images: [
      "https://placehold.co/600x600?text=Sony+XM5",
      "https://placehold.co/600x600?text=Side+View"
    ],
    highlights: [
      "30 Hour Battery",
      "Noise Cancellation",
      "Bluetooth 5.3",
      "Fast Charging"
    ],
    specs: [
      { key: "Driver", detail: "30mm" },
      { key: "Battery", detail: "30 Hours" },
      { key: "Weight", detail: "250g" },
      { key: "Connectivity", detail: "Bluetooth 5.3" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Logitech MX Master 3S",
    description: "Professional productivity mouse.",
    price: 9999,
    discountPrice: 8999,
    brand: "Logitech",
    stock: 55,
    category: "Accessories",
    images: [
      "https://placehold.co/600x600?text=MX+Master+3S",
      "https://placehold.co/600x600?text=Top+View"
    ],
    highlights: [
      "8000 DPI",
      "Silent Clicks",
      "USB-C Charging",
      "Multi-device"
    ],
    specs: [
      { key: "Sensor", detail: "8000 DPI" },
      { key: "Battery", detail: "70 Days" },
      { key: "Weight", detail: "141g" },
      { key: "Connectivity", detail: "Bluetooth" }
    ],
    reviews: [],
    retailer: null
  }
];

  // GENERATE EMBEDDINGS
  const productsWithEmbeddings = await Promise.all(

    products.map(async (product) => {

      const embedding = await createEmbedding(
        `${product.title} ${product.description} ${product.category}`
      );

      return {
        ...product,
        embedding
      };

    })

  );

  // SAVE TO DATABASE
  await Product.insertMany(productsWithEmbeddings);

  return Response.json({
    message: "Database seeded successfully"
  });

}



// "use server"
// import connect from "@/db/connectdb";
// import Product from "@/models/Product";
// import { generateEmbedding } from "@/lib/embedding";

// export async function GET (){
//     await connect();

//     const products = await Product.find()
//    await Product.deleteMany();
//     await Product.insertMany([
//     {
//     title: "Blue sneakers",
//     description: "Comfortable everyday sneakers with a modern sporty design.",
//     price: 59.99,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Footwear"
//   },
 
//   {
//     title: "Leather wallet",
//     description: "Premium quality wallet with multiple card slots.",
//     price: 29.99,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Accessories"
//   },
//   {
//     title: "Gaming mouse",
//     description: "Ergonomic gaming mouse with RGB lighting.",
//     price: 49.99,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Electronics"
//   },
//   {
//     title: "Wireless headphones",
//     description: "Noise-cancelling headphones with deep bass sound.",
//     price: 99.99,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Electronics"
//   },
//   {
//     title: "Classic watch",
//     description: "Elegant wristwatch suitable for formal occasions.",
//     price: 120.00,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Accessories"
//   },
//   {
//     title: "Yoga mat",
//     description: "Non-slip yoga mat perfect for home workouts.",
//     price: 25.50,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Fitness"
//   },
//   {
//     title: "Smartphone stand",
//     description: "Adjustable stand for phones and tablets.",
//     price: 14.99,
//     image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     category: "Electronics"
//   },

//     ])

//     return Response.json({message: "Database seeded successfully"})

// }