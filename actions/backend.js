"use server"

import connect from "@/db/connectdb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import Retailer from "@/models/Retailer"
import Product from "@/models/Product"

export const loginUser = async (email, password) => {
  try {
    await connect()

    const user = await User.findOne({ email })

    if (!user) {
      return { success: false, message: "User not found." }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password." }
    }

    return { success: true, message: "Login successful.", user }

  } catch (error) {
    console.error("Login Error:", error)
    return { success: false, message: "An error occurred during login." }
  }
}

export const wishlist = async (productId, email) => {
  try {                          // ← add try/catch
    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const exists = user.wishlist.some(
      id => id.toString() === productId.toString()
    );

    if (exists) {
      user.wishlist.pull(productId);
      await user.save();
      return { success: true, isWishlisted: false, message: "Removed from wishlist" };
    }

    user.wishlist.addToSet(productId);
    await user.save();
    return { success: true, isWishlisted: true, message: "Added to wishlist" };

  } catch (error) {              // ← handle DB errors
    console.error("Wishlist error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
export const addToCart = async (productId, email) => {
  try {                          // ← add try/catch
    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    user.cart.addToSet(productId);
    await user.save();
    return { success: true, isAddedToCart: true, message: "Added to cart" };

  } catch (error) {              // ← handle DB errors
    console.error("cart error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const showCart = async (email) => {
  try {
    await connect();

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

export const deleteFromCart = async (productId , email) => { 
   await connect();

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

   user.cart.pull(productId);

    await user.save();

    return {
      success: true,
      isWishlisted: false,
      message: "Removed from cart",
    };

 }

export const deleteFromWishlist = async (productId , email) => { 
   await connect();

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

   user.wishlist.pull(productId);

    await user.save();

    return {
      success: true,
      isWishlisted: false,
      message: "Removed from wishlist",
    };

 }

export const showWishlist = async (email) => { 
  await connect()
  const user = await User.findOne({ email })
  .populate("wishlist")
  .lean();



  if (!user) {
    return {
      success: false,
      message: "User not found"
    };
  }
  


  return{
    success:true,
    wishlist: JSON.parse(JSON.stringify(user?.wishlist || []))
  }
  

}

export async function checkWishlist(productId, email) {
  try {
    await connect();
    
    const user = await User.findOne({ 
      email: email,
      wishlist: productId  // mongoose checks if productId exists in the array
    });

    return { isWishlisted: !!user };
    
  } catch (error) {
    return { isWishlisted: false };
  }
}

export const createRetailer = async (data, userId) => {
  
  const {storeName, description, email, phone, state, city, address1, fullName, accountHolder, accountNumber, ifsc, pincode}= data
  

  await connect()

  const retailer = await Retailer.findOne({ owner: userId });

  if (retailer) {
    return {
      success: false,
      message: "you have already a seller account",
      retailerId: retailer._id.toString()
    }

  }

const newRetailer = await Retailer.create({
  owner: userId,
  name: fullName,
  storeName,
  storeDescription: description,      // form sends "description"
  phoneNumber: phone,                  // form sends "phone"
  businessEmail: email,               // form sends "email"
  address: address1,
  state: state,  // combine address fields
  city: city, 
  pincode: pincode, // combine address fields
  country: "India",                   // hardcode since you don't collect it
  accountHolder,
  accountNumber,
  ifsc,
});

  await User.findByIdAndUpdate(userId, {
    retailerId: newRetailer._id,
  });

   return {
    success: true,
    message: "Seller account created successfully.",
    retailerId: newRetailer._id.toString(),
  };

}
export const checkRetailer = async (userId) => {
  
 
  await connect()

  const retailer = await Retailer.findOne({ owner: userId });

  if (!retailer) {
    return {
      success: false,
      message: "you have already a seller account",
      retailerId: null
    }
  }

  return {
      success: true,
      message: "you have already a seller account",
      retailerId: retailer._id.toString()
    }


}



export const getProduct = async (id)=>{
  await connect();

  const product = await Product.findById(id).lean();

  if (!product) return null;

  let seller = null;

  try {
    seller = await Retailer.findById(product.retailerId).lean();
  } catch {
    seller = null;
  }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  return {
    product: JSON.parse(JSON.stringify(product)),
    seller: seller
      ? JSON.parse(JSON.stringify(seller))
      : null,
    relatedProducts: JSON.parse(
      JSON.stringify(relatedProducts)
    ),
  };
}

