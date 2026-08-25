"use server"

import connect from "@/db/connectdb";
import Product from "@/models/Product";
import { createEmbedding } from "@/lib/embedding";

export async function GET() {

  await connect();

  await Product.deleteMany();

const products = [
  // =========================
  // FASHION
  // =========================

  {
    title: "Levi's Men's Slim Fit Denim Jacket",
    description: "Classic denim jacket with a modern slim-fit design.",
    price: 4999,
    discountPrice: 3499,
    brand: "Levi's",
    stock: 24,
    category: "Fashion",
    images: [
      "https://placehold.co/600x600?text=Denim+Jacket",
      "https://placehold.co/600x600?text=Jacket+Back"
    ],
    highlights: [
      "Premium Denim Fabric",
      "Slim Fit",
      "Metal Buttons",
      "Machine Washable"
    ],
    specs: [
      { key: "Material", detail: "100% Cotton Denim" },
      { key: "Fit", detail: "Slim Fit" },
      { key: "Color", detail: "Blue" },
      { key: "Size", detail: "S, M, L, XL" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Puma Women's Casual Sneakers",
    description: "Comfortable everyday sneakers designed for casual wear.",
    price: 3999,
    discountPrice: 2799,
    brand: "Puma",
    stock: 32,
    category: "Fashion",
    images: [
      "https://placehold.co/600x600?text=Puma+Sneakers",
      "https://placehold.co/600x600?text=Sneaker+Side"
    ],
    highlights: [
      "Lightweight Design",
      "Cushioned Sole",
      "Breathable Upper",
      "Everyday Comfort"
    ],
    specs: [
      { key: "Material", detail: "Mesh and Synthetic" },
      { key: "Sole", detail: "Rubber" },
      { key: "Color", detail: "White" },
      { key: "Closure", detail: "Lace-Up" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // SMARTPHONES
  // =========================

  {
    title: "Samsung Galaxy S25",
    description: "Premium Android flagship smartphone with a powerful processor and advanced camera system.",
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
    title: "OnePlus 13",
    description: "High-performance smartphone offering a smooth display and flagship-level performance.",
    price: 74999,
    discountPrice: 69999,
    brand: "OnePlus",
    stock: 21,
    category: "Smartphones",
    images: [
      "https://placehold.co/600x600?text=OnePlus+13",
      "https://placehold.co/600x600?text=OnePlus+Camera"
    ],
    highlights: [
      "120Hz LTPO AMOLED",
      "Snapdragon 8 Elite",
      "50MP Triple Camera",
      "100W Fast Charging"
    ],
    specs: [
      { key: "Display", detail: "6.82 inch AMOLED" },
      { key: "RAM", detail: "12GB" },
      { key: "Storage", detail: "256GB" },
      { key: "Battery", detail: "6000mAh" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // ELECTRONICS
  // =========================

  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Premium wireless headphones featuring industry-leading noise cancellation.",
    price: 34990,
    discountPrice: 29990,
    brand: "Sony",
    stock: 15,
    category: "Electronics",
    images: [
      "https://placehold.co/600x600?text=Sony+Headphones",
      "https://placehold.co/600x600?text=Headphones+Side"
    ],
    highlights: [
      "Active Noise Cancellation",
      "30 Hour Battery",
      "Hi-Res Audio",
      "Bluetooth 5.2"
    ],
    specs: [
      { key: "Battery", detail: "30 Hours" },
      { key: "Connectivity", detail: "Bluetooth 5.2" },
      { key: "Weight", detail: "250g" },
      { key: "Charging", detail: "USB-C" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Apple Watch Series 10",
    description: "Smartwatch with advanced health features, fitness tracking and a bright display.",
    price: 46900,
    discountPrice: 41900,
    brand: "Apple",
    stock: 12,
    category: "Electronics",
    images: [
      "https://placehold.co/600x600?text=Apple+Watch",
      "https://placehold.co/600x600?text=Apple+Watch+Display"
    ],
    highlights: [
      "Always-On Display",
      "Health Tracking",
      "Fitness Monitoring",
      "Fast Charging"
    ],
    specs: [
      { key: "Display", detail: "46mm OLED" },
      { key: "Battery", detail: "Up to 18 Hours" },
      { key: "Water Resistance", detail: "50m" },
      { key: "Connectivity", detail: "Bluetooth & Wi-Fi" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // BEAUTY
  // =========================

  {
    title: "L'Oréal Paris Revitalift Serum",
    description: "Lightweight facial serum designed for daily skincare and hydration.",
    price: 999,
    discountPrice: 799,
    brand: "L'Oréal Paris",
    stock: 45,
    category: "Beauty",
    images: [
      "https://placehold.co/600x600?text=Face+Serum",
      "https://placehold.co/600x600?text=Serum+Bottle"
    ],
    highlights: [
      "Hyaluronic Acid",
      "Lightweight Formula",
      "Daily Hydration",
      "Fast Absorption"
    ],
    specs: [
      { key: "Volume", detail: "30ml" },
      { key: "Skin Type", detail: "All Skin Types" },
      { key: "Form", detail: "Serum" },
      { key: "Usage", detail: "Morning & Night" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Maybelline SuperStay Matte Lipstick",
    description: "Long-lasting matte lipstick with rich color and comfortable wear.",
    price: 799,
    discountPrice: 599,
    brand: "Maybelline",
    stock: 38,
    category: "Beauty",
    images: [
      "https://placehold.co/600x600?text=Matte+Lipstick",
      "https://placehold.co/600x600?text=Lipstick+Color"
    ],
    highlights: [
      "Long Lasting",
      "Matte Finish",
      "Highly Pigmented",
      "Transfer Resistant"
    ],
    specs: [
      { key: "Finish", detail: "Matte" },
      { key: "Color", detail: "Red" },
      { key: "Weight", detail: "5g" },
      { key: "Wear Time", detail: "Up to 16 Hours" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // FITNESS
  // =========================

  {
    title: "Decathlon Adjustable Dumbbell Set",
    description: "Adjustable dumbbell set suitable for home strength training.",
    price: 5999,
    discountPrice: 4999,
    brand: "Decathlon",
    stock: 20,
    category: "Fitness",
    images: [
      "https://placehold.co/600x600?text=Dumbbell+Set",
      "https://placehold.co/600x600?text=Adjustable+Dumbbell"
    ],
    highlights: [
      "Adjustable Weight",
      "Solid Construction",
      "Home Workout",
      "Easy Storage"
    ],
    specs: [
      { key: "Weight", detail: "Up to 20kg" },
      { key: "Material", detail: "Cast Iron" },
      { key: "Pieces", detail: "2 Dumbbells" },
      { key: "Use", detail: "Strength Training" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Nike Training Dri-FIT T-Shirt",
    description: "Breathable training t-shirt designed to keep you comfortable during workouts.",
    price: 1999,
    discountPrice: 1499,
    brand: "Nike",
    stock: 34,
    category: "Fitness",
    images: [
      "https://placehold.co/600x600?text=Nike+Training+Shirt",
      "https://placehold.co/600x600?text=Training+Shirt+Back"
    ],
    highlights: [
      "Dri-FIT Technology",
      "Breathable Fabric",
      "Sweat Wicking",
      "Lightweight"
    ],
    specs: [
      { key: "Material", detail: "100% Polyester" },
      { key: "Fit", detail: "Regular Fit" },
      { key: "Color", detail: "Black" },
      { key: "Sleeves", detail: "Half Sleeves" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // HOME
  // =========================

  {
    title: "Philips LED Smart Table Lamp",
    description: "Modern smart table lamp with adjustable brightness and multiple lighting modes.",
    price: 2999,
    discountPrice: 2299,
    brand: "Philips",
    stock: 25,
    category: "Home",
    images: [
      "https://placehold.co/600x600?text=Smart+Lamp",
      "https://placehold.co/600x600?text=Lamp+Side"
    ],
    highlights: [
      "Adjustable Brightness",
      "Multiple Light Modes",
      "Touch Controls",
      "Energy Efficient"
    ],
    specs: [
      { key: "Power", detail: "12W" },
      { key: "Color Temperature", detail: "3000K-6500K" },
      { key: "Control", detail: "Touch" },
      { key: "Material", detail: "ABS Plastic" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "IKEA Minimalist Wall Shelf",
    description: "Simple and stylish wall shelf perfect for books, decor and everyday storage.",
    price: 1499,
    discountPrice: 1199,
    brand: "IKEA",
    stock: 40,
    category: "Home",
    images: [
      "https://placehold.co/600x600?text=Wall+Shelf",
      "https://placehold.co/600x600?text=Shelf+Detail"
    ],
    highlights: [
      "Minimal Design",
      "Easy Installation",
      "Space Saving",
      "Durable Finish"
    ],
    specs: [
      { key: "Material", detail: "Engineered Wood" },
      { key: "Length", detail: "80cm" },
      { key: "Color", detail: "White" },
      { key: "Mount Type", detail: "Wall Mounted" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // BOOKS
  // =========================

  {
    title: "Atomic Habits",
    description: "Practical guide to building better habits and improving everyday routines.",
    price: 799,
    discountPrice: 599,
    brand: "Penguin",
    stock: 50,
    category: "Books",
    images: [
      "https://placehold.co/600x600?text=Atomic+Habits",
      "https://placehold.co/600x600?text=Book+Back"
    ],
    highlights: [
      "Habit Building",
      "Self Improvement",
      "Practical Strategies",
      "Easy to Read"
    ],
    specs: [
      { key: "Author", detail: "James Clear" },
      { key: "Pages", detail: "320" },
      { key: "Language", detail: "English" },
      { key: "Format", detail: "Paperback" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "The Psychology of Money",
    description: "Insightful lessons about money, investing, behavior and financial decision-making.",
    price: 699,
    discountPrice: 499,
    brand: "Jaico",
    stock: 42,
    category: "Books",
    images: [
      "https://placehold.co/600x600?text=Psychology+of+Money",
      "https://placehold.co/600x600?text=Book+Cover"
    ],
    highlights: [
      "Personal Finance",
      "Investing Lessons",
      "Money Psychology",
      "Real World Stories"
    ],
    specs: [
      { key: "Author", detail: "Morgan Housel" },
      { key: "Pages", detail: "256" },
      { key: "Language", detail: "English" },
      { key: "Format", detail: "Paperback" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // GROCERY
  // =========================

  {
    title: "Tata Salt Iodized Salt",
    description: "Premium iodized salt suitable for everyday cooking.",
    price: 35,
    discountPrice: 30,
    brand: "Tata",
    stock: 100,
    category: "Grocery",
    images: [
      "https://placehold.co/600x600?text=Tata+Salt",
      "https://placehold.co/600x600?text=Salt+Pack"
    ],
    highlights: [
      "Iodized Salt",
      "Everyday Essential",
      "Fine Crystals",
      "Quality Tested"
    ],
    specs: [
      { key: "Weight", detail: "1kg" },
      { key: "Type", detail: "Iodized Salt" },
      { key: "Packaging", detail: "Pouch" },
      { key: "Shelf Life", detail: "24 Months" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Fortune Sunflower Oil",
    description: "Light and versatile sunflower cooking oil for everyday meals.",
    price: 180,
    discountPrice: 159,
    brand: "Fortune",
    stock: 75,
    category: "Grocery",
    images: [
      "https://placehold.co/600x600?text=Sunflower+Oil",
      "https://placehold.co/600x600?text=Oil+Bottle"
    ],
    highlights: [
      "Light Texture",
      "Refined Oil",
      "Everyday Cooking",
      "High Heat Suitable"
    ],
    specs: [
      { key: "Volume", detail: "1L" },
      { key: "Type", detail: "Sunflower Oil" },
      { key: "Packaging", detail: "Bottle" },
      { key: "Shelf Life", detail: "12 Months" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // ACCESSORIES
  // =========================

  {
    title: "Fossil Leather Wallet",
    description: "Premium compact wallet with multiple card slots and a sleek design.",
    price: 2995,
    discountPrice: 2199,
    brand: "Fossil",
    stock: 28,
    category: "Accessories",
    images: [
      "https://placehold.co/600x600?text=Leather+Wallet",
      "https://placehold.co/600x600?text=Wallet+Inside"
    ],
    highlights: [
      "Genuine Leather",
      "Multiple Card Slots",
      "Compact Design",
      "Premium Finish"
    ],
    specs: [
      { key: "Material", detail: "Leather" },
      { key: "Card Slots", detail: "8" },
      { key: "Color", detail: "Brown" },
      { key: "Closure", detail: "Fold" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Ray-Ban Classic Sunglasses",
    description: "Timeless sunglasses with a stylish frame and UV protection.",
    price: 8990,
    discountPrice: 6990,
    brand: "Ray-Ban",
    stock: 16,
    category: "Accessories",
    images: [
      "https://placehold.co/600x600?text=RayBan+Sunglasses",
      "https://placehold.co/600x600?text=Sunglasses+Case"
    ],
    highlights: [
      "UV Protection",
      "Classic Frame",
      "Lightweight",
      "Premium Lenses"
    ],
    specs: [
      { key: "Frame", detail: "Acetate" },
      { key: "Lens", detail: "Polarized" },
      { key: "UV Protection", detail: "100% UV" },
      { key: "Color", detail: "Black" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // GAMING
  // =========================

  {
    title: "Logitech G Pro Wireless Gaming Mouse",
    description: "Lightweight esports gaming mouse designed for precision and fast response.",
    price: 11995,
    discountPrice: 9999,
    brand: "Logitech",
    stock: 19,
    category: "Gaming",
    images: [
      "https://placehold.co/600x600?text=Gaming+Mouse",
      "https://placehold.co/600x600?text=Mouse+Side"
    ],
    highlights: [
      "25K DPI Sensor",
      "Wireless Connectivity",
      "Lightweight Design",
      "Programmable Buttons"
    ],
    specs: [
      { key: "Sensor", detail: "HERO 25K" },
      { key: "DPI", detail: "Up to 25600" },
      { key: "Weight", detail: "80g" },
      { key: "Connectivity", detail: "Wireless" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Razer BlackWidow V4 Mechanical Keyboard",
    description: "Premium mechanical gaming keyboard built for responsive gaming and customization.",
    price: 15999,
    discountPrice: 12999,
    brand: "Razer",
    stock: 14,
    category: "Gaming",
    images: [
      "https://placehold.co/600x600?text=Razer+Keyboard",
      "https://placehold.co/600x600?text=Keyboard+RGB"
    ],
    highlights: [
      "Mechanical Switches",
      "RGB Lighting",
      "Programmable Keys",
      "Wrist Rest"
    ],
    specs: [
      { key: "Switch Type", detail: "Mechanical" },
      { key: "Lighting", detail: "RGB" },
      { key: "Connection", detail: "USB-C" },
      { key: "Layout", detail: "Full Size" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // TOYS
  // =========================

  {
    title: "LEGO Classic Creative Building Set",
    description: "Creative LEGO building set with colorful bricks for imaginative play.",
    price: 2499,
    discountPrice: 1999,
    brand: "LEGO",
    stock: 35,
    category: "Toys",
    images: [
      "https://placehold.co/600x600?text=LEGO+Set",
      "https://placehold.co/600x600?text=LEGO+Bricks"
    ],
    highlights: [
      "Creative Building",
      "Colorful Bricks",
      "Reusable Pieces",
      "Imaginative Play"
    ],
    specs: [
      { key: "Pieces", detail: "500+" },
      { key: "Age", detail: "4+ Years" },
      { key: "Material", detail: "ABS Plastic" },
      { key: "Set Type", detail: "Building Blocks" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Hot Wheels Die-Cast Car Set",
    description: "Collectible miniature cars designed for racing and imaginative play.",
    price: 999,
    discountPrice: 799,
    brand: "Hot Wheels",
    stock: 48,
    category: "Toys",
    images: [
      "https://placehold.co/600x600?text=Hot+Wheels",
      "https://placehold.co/600x600?text=Toy+Cars"
    ],
    highlights: [
      "Die-Cast Metal",
      "Collectible Cars",
      "Racing Play",
      "Colorful Designs"
    ],
    specs: [
      { key: "Pieces", detail: "5 Cars" },
      { key: "Material", detail: "Die-Cast Metal" },
      { key: "Age", detail: "3+ Years" },
      { key: "Scale", detail: "1:64" }
    ],
    reviews: [],
    retailer: null
  },

  // =========================
  // SPORTS
  // =========================

  {
    title: "Yonex Badminton Racquet",
    description: "Lightweight badminton racquet designed for control and fast movement.",
    price: 2999,
    discountPrice: 2399,
    brand: "Yonex",
    stock: 26,
    category: "Sports",
    images: [
      "https://placehold.co/600x600?text=Yonex+Racquet",
      "https://placehold.co/600x600?text=Racquet+Frame"
    ],
    highlights: [
      "Lightweight Frame",
      "High Tension Support",
      "Powerful Shots",
      "Durable Build"
    ],
    specs: [
      { key: "Weight", detail: "83g" },
      { key: "Material", detail: "Graphite" },
      { key: "String Tension", detail: "20-28 lbs" },
      { key: "Length", detail: "675mm" }
    ],
    reviews: [],
    retailer: null
  },

  {
    title: "Adidas Match Football",
    description: "Durable football designed for training, practice and recreational matches.",
    price: 1999,
    discountPrice: 1599,
    brand: "Adidas",
    stock: 30,
    category: "Sports",
    images: [
      "https://placehold.co/600x600?text=Adidas+Football",
      "https://placehold.co/600x600?text=Football+Closeup"
    ],
    highlights: [
      "Durable Construction",
      "Machine Stitched",
      "Stable Flight",
      "Training Ready"
    ],
    specs: [
      { key: "Size", detail: "Size 5" },
      { key: "Material", detail: "Synthetic Leather" },
      { key: "Bladder", detail: "Butyl" },
      { key: "Use", detail: "Training & Matches" }
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