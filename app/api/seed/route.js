"use server"

import connect from "@/db/connectdb";
import Product from "@/models/Product";
import { createEmbedding } from "@/lib/embedding";

export async function GET() {

  await connect();

  await Product.deleteMany();

  const products = [

    {
      title: "Blue sneakers",
      description: "Comfortable everyday sneakers with a modern sporty design.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1519741491534-1e1a0e9b8c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Footwear"
    },

    {
      title: "Leather wallet",
      description: "Premium quality wallet with multiple card slots.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=500&q=60",
      category: "Accessories"
    },

    {
      title: "Gaming mouse",
      description: "Ergonomic gaming mouse with RGB lighting.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=60",
      category: "Electronics"
    },

    {
      title: "Wireless headphones",
      description: "Noise-cancelling headphones with deep bass sound.",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60",
      category: "Electronics"
    },

    {
      title: "Classic watch",
      description: "Elegant wristwatch suitable for formal occasions.",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=60",
      category: "Accessories"
    },

    {
      title: "Yoga mat",
      description: "Non-slip yoga mat perfect for home workouts.",
      price: 25.50,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=500&q=60",
      category: "Fitness"
    },

    {
      title: "Smartphone stand",
      description: "Adjustable stand for phones and tablets.",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=60",
      category: "Electronics"
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