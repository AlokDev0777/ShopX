"use server";
import connect from "@/db/connectdb";
import Product from "@/models/Product";

import { createEmbedding } from "@/lib/embedding";

import similarity from "compute-cosine-similarity";

export async function POST(req) {

  await connect();

  const body = await req.json();

  const { query } = body;



  // CREATE SEARCH EMBEDDING
  const queryEmbedding = await createEmbedding(query);



  // GET PRODUCTS
  const products = await Product.find();



  // CALCULATE SIMILARITY
  const rankedProducts = products.map((product) => {

    const score = similarity(
      queryEmbedding,
      product.embedding
    );

    return {
      ...product.toObject(),
      score
    };

  });



  // SORT BY BEST MATCH
  rankedProducts.sort((a, b) => b.score - a.score);



  // RETURN TOP PRODUCTS
  return Response.json({
    products: rankedProducts
  });

}