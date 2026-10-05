
"use client";

import Image from "next/image";
import { showCart, deleteFromCart } from "@/actions/backend";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Minus,
  Plus,
  ShieldCheck,
  RotateCcw,
  Store,
  ArrowRight,
} from "lucide-react";

import Footer from "@/components/footer";
import Nav from "@/components/Nav";

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);

  // Load cart
  // useEffect(() => {
  //   if (!session?.user?.email) return;

  //   const loadCart = async () => {
  //     try {
  //       const data = await showCart(session.user.email);

  //       setCartItems(data?.cart || []);
  //     } catch (error) {
  //       console.error("Failed to load cart:", error);
  //       setCartItems([]);
  //     }
  //   };

  //   loadCart();
  // }, [session?.user?.email]);

  useEffect(() => {
  if (!session?.user?.email) return;

  showCart(session.user.email)
    .then((data) => {
      console.log("CART DATA:", data);
      setCartItems(data?.cart || []);
    })
    .catch((error) => {
      console.error("Failed to load cart:", error);
    });
}, [session?.user?.email]);

  // Remove product completely from cart
  const handleRemove = async (productId) => {
    try {
      const result = await deleteFromCart(productId);

      if (result?.success === false) {
        console.error(result.message);
        return;
      }

      setCartItems((prev) =>
        prev.filter(
          (item) => item.product?._id?.toString() !== productId.toString()
        )
      );
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  // Increase quantity locally
  // Backend action can be connected later.
  const handleIncrease = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.product?._id?.toString() === productId.toString()
        ) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      })
    );
  };

  // Decrease quantity locally
  const handleDecrease = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.product?._id?.toString() === productId.toString()
        ) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          };
        }

        return item;
      })
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = Number(item.quantity || 1);

    return total + price * quantity;
  }, 0);

  // Currently no real discount system
  const discount = 0;

  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-14">
        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT - CART ITEMS */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-[28px] p-10 border border-slate-200 text-center">
                <h2 className="text-2xl font-bold text-[#071633]">
                  Your cart is empty
                </h2>

                <p className="mt-2 text-slate-500">
                  Add some products to your cart to see them here.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const product = item.product;

                if (!product) return null;

                const productId = product._id?.toString();
                const cartItemId = item._id?.toString();

                const quantity = Number(item.quantity || 1);
                const price = Number(product.price || 0);

                const image =
                  product.images?.[0] || "/placeholder.png";

                return (
                  <div
                    key={cartItemId}
                    className="bg-white rounded-[28px] p-5 md:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-row gap-6">
                      {/* IMAGE */}
                      <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-3xl overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
                        <Image
                          src={image}
                          alt={product.title || "Product"}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-[#071633] truncate">
                              {product.title}
                            </h2>

                            <div className="flex items-center gap-2 mt-2 text-slate-500">
                              <Store size={16} />
                              <span>Sold by hello</span>
                            </div>

                            <div className="inline-flex mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                              Free Delivery Tomorrow
                            </div>
                          </div>

                          {/* REMOVE */}
                          <button
                            onClick={() => handleRemove(productId)}
                            className="h-11 w-11 shrink-0 rounded-xl border flex items-center justify-center hover:bg-red-50"
                          >
                            <Trash2
                              size={18}
                              className="text-red-500"
                            />
                          </button>
                        </div>

                        {/* PRICE */}
                        <div className="mt-5 flex items-center gap-3">
                          <span className="text-3xl font-bold text-[#071633]">
                            ₹{price}
                          </span>

                          <span className="text-slate-400 line-through">
                            ₹{Math.round(price * 1.5)}
                          </span>
                        </div>

                        {/* QUANTITY */}
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-2xl">
                            <button
                              onClick={() =>
                                handleDecrease(productId)
                              }
                              disabled={quantity <= 1}
                              className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center disabled:opacity-40"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="font-semibold min-w-5 text-center">
                              {quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleIncrease(productId)
                              }
                              className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          {/* ITEM TOTAL */}
                          <div className="text-lg font-bold text-[#071633]">
                            ₹{price * quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-4xl p-7 sticky top-26 shadow-lg border">
              <h2 className="text-2xl font-bold text-[#071633] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* SUBTOTAL */}
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                {/* DISCOUNT */}
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Discount
                  </span>

                  <span className="text-green-600 font-semibold">
                    -₹{discount}
                  </span>
                </div>

                {/* SHIPPING */}
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shipping
                  </span>

                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <hr />

                {/* TOTAL */}
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-[#071633]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#071633]">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* CHECKOUT */}
              <button
                className="mt-8 w-full bg-[#2563FF] hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2 transition"
                onClick={() =>
                  router.push("/checkout?type=cart")
                }
              >
                Checkout
                <ArrowRight size={18} />
              </button>

              {/* TRUST */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-3 items-center">
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-sm text-slate-600">
                    Secure Payments
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <RotateCcw
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-sm text-slate-600">
                    Easy Returns
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-sm text-slate-600">
                    Buyer Protection
                  </span>
                </div>
              </div>

              {/* SAVINGS */}
              <div className="mt-8 bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-600">
                  You saved
                </p>

                <h3 className="text-2xl font-bold text-blue-600">
                  ₹{discount}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold text-[#071633] mb-6">
            You May Also Like
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl h-72 shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

