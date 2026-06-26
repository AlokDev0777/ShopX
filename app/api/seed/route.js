"use server"

import connect from "@/db/connectdb";
import Product from "@/models/Product";
import { createEmbedding } from "@/lib/embedding";

export async function GET() {

  await connect();

  await Product.deleteMany();

  const products = [

    {
      title: "minamilist",
      description: "vitamin c serum for glowing skin",
      price: 59,
      image: "/minimalist.webp",
      category: "perfume"
    },

    {
      title: "fashwash",
      description: "Gentle face wash for all skin types.",
      price: 29,
      image: "/fashwash.jpg",
      category: "skincare"
    },

    {
      title: "Macbook Pro",
      description: "Powerful laptop for professionals.",
      price: 1299,
      image: "/macbook.png",
      category: "Electronics"
    },

    {
      title: "Laptop",
      description: "Powerful gaming laptop for gamers",
      price: 49999,
      image: "/laptop.png",
      category: "Electronics",
    },

    {
      title: "Organizer bag",
      description: "Bag for organising your electronics items",
      price: 999,
      image: "/organizer bag.png",
      category: "Electronics",
    },
    {
      title: "Monitor",
      description: "Best monitor for gaming with a refresh rate of 144hz",
      price: 9999,
      image: "/monitor.png",
      category: "Electronics",
    },


    {
      title: "jeans",
      description: "Comfortable jeans for everyday wear.",
      price: 499,
      image: "/jeans2.png",
      category: "Clothing"
    },

     {
      title: "t-shirt",
      description: "Comfortable t-shirt for everyday wear.",
      price: 1999,
      image: "/t-shirt.png",
      category: "Clothing"
    },


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