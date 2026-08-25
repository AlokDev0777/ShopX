"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import connect from "@/db/connectdb";
import User from "@/models/User";
import Retailer from "@/models/Retailer";
import Product from "@/models/Product";
import Orders from "@/models/Orders";
import Razorpay from "razorpay";
import mongoose from "mongoose";

// Helper function to safely get authenticated user email
async function getAuthEmail() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized access. Please login.");
  }
  return session.user.email;
}

export const wishlist = async (productId) => {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    const exists = user.wishlist.some(id => id.toString() === productId.toString());

    if (exists) {
      user.wishlist.pull(productId);
      await user.save();
      return { success: true, isWishlisted: false, message: "Removed from wishlist" };
    }

    user.wishlist.addToSet(productId);
    await user.save();
    return { success: true, isWishlisted: true, message: "Added to wishlist" };
  } catch (error) {
    console.error("Wishlist error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const addToCart = async (productId) => {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    user.cart.addToSet(productId);
    await user.save();
    return { success: true, isAddedToCart: true, message: "Added to cart" };
  } catch (error) {
    console.error("Cart error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const showCart = async () => {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email }).populate("cart").lean();

    if (!user) return { success: false, cart: [] };

    return {
      success: true,
      cart: JSON.parse(JSON.stringify(user?.cart || []))
    };
  } catch (error) {
    console.error("showCart error:", error);
    return { success: false, cart: [] };
  }
};

export const deleteFromCart = async (productId) => { 
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    user.cart.pull(productId);
    await user.save();

    return { success: true, message: "Removed from cart" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete item" };
  }
};

export const deleteFromWishlist = async (productId) => { 
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    user.wishlist.pull(productId);
    await user.save();

    return { success: true, message: "Removed from wishlist" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete item" };
  }
};

export const showWishlist = async () => { 
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email }).populate("wishlist").lean();

    if (!user) return { success: false, message: "User not found" };

    return {
      success: true,
      wishlist: JSON.parse(JSON.stringify(user?.wishlist || []))
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to fetch wishlist" , wishlist: JSON.parse(JSON.stringify(user?.wishlist || [])) };
  }
};

export async function checkWishlist(productId) {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email, wishlist: productId });
    return { isWishlisted: !!user };
  } catch (error) {
    return { isWishlisted: false };
  }
}

export const createRetailer = async (data) => {
  try {
    const { storeName, description, phone, state, city, address1, fullName, accountHolder, accountNumber, ifsc, pincode } = data;
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    const retailer = await Retailer.findOne({ owner: user._id });
    if (retailer) {
      return {
        success: false,
        message: "You already have a seller account.",
        retailerId: retailer._id.toString()
      };
    }

    const newRetailer = await Retailer.create({
      owner: user._id,
      name: fullName,
      storeName,
      storeDescription: description,
      phoneNumber: phone,
      businessEmail: email,
      address: address1,
      state,
      city, 
      pincode, 
      accountHolder,
      accountNumber,
      ifsc,
    });


    
console.log("User before update:", user);

console.log("New retailer id:", newRetailer._id);

user.retailerId = newRetailer._id;

console.log("User after assigning:", user);

await user.save();

console.log("After save:", await User.findById(user._id));

    return {
      success: true,
      message: "Seller account created successfully.",
      retailerId: newRetailer._id.toString(),
    };
  } catch (error) {
    return { success: false, message: "Failed to create retailer account." };
  }
};

export const checkRetailer = async () => {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });
    const retailer = await Retailer.findOne({ owner: user._id });

    if (!retailer) {
      return {
        success: false,
        message: "No seller account found.",
        retailerId: null
      };
    }

    return {
      success: true,
      message: "Seller account found.",
      retailerId: retailer._id.toString()
    };
  } catch (error) {
    return { success: false, retailerId: null };
  }
};

export const getProduct = async (id) => {
  try {
    await connect();
    const product = await Product.findById(id).lean();
    if (!product) return null;

    let seller = null;
    try {
      seller = await Retailer.findById(product.retailer).lean(); // Fixed property name 'retailer' matching schema
    } catch {
      seller = null;
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4).lean();

    return {
      product: JSON.parse(JSON.stringify(product)),
      seller: seller ? JSON.parse(JSON.stringify(seller)) : null,
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function addProduct(formData) {
  try {
    await connect();
    const email = await getAuthEmail();
    const user = await User.findOne({ email });

    if (!user || !user.retailerId) {
      return { success: false, message: "Retailer account not found." };
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const category = formData.get("category");
    const stock = Number(formData.get("stock"));
    const price = Number(formData.get("price"));
    const discountPrice = formData.get("discountPrice") === "" ? null : Number(formData.get("discountPrice"));

    const highlights = JSON.parse(formData.get("highlights") || "[]");
    const specs = JSON.parse(formData.get("specs") || "[]");

    await Product.create({
      title,
      description,
      brand,
      category,
      stock,
      price,
      discountPrice,
      highlights,
      specs,
      images: [],
      retailer: user.retailerId,
    });

    return { success: true, message: "Product added successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong." };
  }
}



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount, email) => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay takes amount in paise, not rupees
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return { success: true, orderId: order.id, amount: order.amount };
  } catch (error) {
    return { success: false, message: "Payment initiation failed" };
  }
};

import crypto from "crypto";

export const verifyAndCreateOrder = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  items,
  totalAmount,
  userEmail,
  deliveryAddress,
}) => {
  try {
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return { success: false, message: "Payment verification failed" };
    }

    await connect();
    const user = await User.findOne({ email: userEmail });

    console.log("user found:", user); // ← add this
    console.log("items received:", items); // ← add this
    console.log("totalAmount:", totalAmount); // ← add this
    console.log("deliveryAddress:", deliveryAddress); // ← add this

    const formattedItems = items.map((item) => ({
  product: new mongoose.Types.ObjectId(item.product),
  title: item.title,
  image: item.image,
  price: item.price,
  quantity: item.quantity,
}));


    const order = await Orders.create({
      user: user._id,
      formattedItems,
      totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      isPaid: true,
      status: "confirmed",
      deliveryAddress,
    });

    console.log("order created:", order); // ← add this

    return { success: true, orderId: order._id.toString() };

  } catch (error) {
    console.error("verifyAndCreateOrder error:", error); // ← most important
    return { success: false, message: "Something went wrong" };
  }
};

export const getUserAddress = async (email) => {
  try {
    await connect();
    const user = await User.findOne({ email }).lean();
    return { address: user?.address || null };
  } catch (error) {
    return { address: null };
  }
};

export const saveAddress = async (email, address) => {
  try {
    await connect();
    await User.findOneAndUpdate({ email }, { address });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const getProductById = async (productId) => {
  try {
    await connect();
    const product = await Product.findById(productId).lean();
    if (!product) return { success: false };
    return {
      success: true,
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch (error) {
    return { success: false };
  }
};

export const addReview = async (productId, rating, comment) => {
  try {
    await connect();

        const email = await getAuthEmail();

    const user = await User.findOne({ email: email });
    if (!user) return { success: false, message: "User not found" };

    // Check if user actually purchased this product
    const order = await Orders.findOne({
      user: user._id,
      "items.product": new mongoose.Types.ObjectId(productId),
      isPaid: true,
    });

    if (!order) {
      return {
        success: false,
        message: "You can only review products you have purchased",
      };
    }

    // Check if user already reviewed this product
    const product = await Product.findById(productId);
    if (!product) return { success: false, message: "Product not found" };

    const alreadyReviewed = product.reviews.some(
      (r) => r.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      return {
        success: false,
        message: "You have already reviewed this product",
      };
    }

    // Add review
    product.reviews.push({
      user: user._id,
      name: user.name,
      rating: Number(rating),
      comment,
      verified: true,
    });

    await product.save();

    return { success: true, message: "Review added successfully" };

  } catch (error) {
    console.error("addReview error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const getReviews = async (productId) => {
  try {
    await connect();

    const product = await Product.findById(productId)
      .select("reviews")
      .lean();

    if (!product) return { success: false, reviews: [] };

    return {
      success: true,
      reviews: JSON.parse(JSON.stringify(product.reviews)),
    };

  } catch (error) {
    return { success: false, reviews: [] };
  }
};

export const getProductReviews = async (productId) => {
  try {
    await connect();
    const product = await Product.findById(productId)
      .select("reviews specs highlights")
      .lean();

    if (!product) return { success: false, reviews: [], specs: [], highlights: [] };

    return {
      success: true,
      reviews: JSON.parse(JSON.stringify(product.reviews || [])),
      specs: JSON.parse(JSON.stringify(product.specs || [])),
      highlights: JSON.parse(JSON.stringify(product.highlights || [])),
    };
  } catch (error) {
    console.error("getProductReviews error:", error);
    return { success: false, reviews: [], specs: [], highlights: [] };
  }
};

export const getUserOrders = async (email) => {
  try {
    await connect();

    const user = await User.findOne({ email });
    if (!user) return { success: false, orders: [] };

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 }) // newest first
      .lean();

    return {
      success: true,
      orders: JSON.parse(JSON.stringify(orders)),
    };

  } catch (error) {
    console.error("getUserOrders error:", error);
    return { success: false, orders: [] };
  }
};

export async function getProductsByCategory(category) {
  await connect();
  const Products = await Product.find({})
  return Products?.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getAllCategories() {
  await connect();

  // .distinct() returns only the unique values of the given field
  const categories = await Product.distinct("category");

  return categories;
}

export async function checkDb(){
   await connect();
}

export async function getitemsbycategory(category) {
  try {
    await connect();

    const products = await Product.find({
      category: {
        $regex: `^${category}$`,
        $options: "i",
      },
    }).lean();

    return {
      success: true,
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    console.error("getitemsbycategory error:", error);
    return {
      success: false,
      products: [],
    };
  }
}