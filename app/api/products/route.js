"use server"

import connect from "@/db/connectdb";
import Product from "@/models/Product";

export const GET = async (request) => {
  try {
    await connect();

    const products = await Product.find({});

    return new Response(JSON.stringify({ products }), {
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
  

    return new Response(
      JSON.stringify({
        error: "Failed to fetch products",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};