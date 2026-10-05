"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import Nav from "@/components/Nav";
import {
  MapPin,
  ShieldCheck,
  ChevronRight,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import {
  getProductById,
  showCart,
  createRazorpayOrder,
  verifyAndCreateOrder,
  saveAddress,
  getUserAddress,
} from "@/actions/backend";

function CheckoutContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const productId = searchParams.get("productId");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);

  // Address
  const [address, setAddress] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  // ── Load items based on type ──────────────────────

  useEffect(() => {
    if (!session?.user?.email) return;

    const load = async () => {
      setLoading(true);

      try {
        if (type === "buynow" && productId) {
          const result = await getProductById(productId);

          if (result.success) {
            setItems([{ ...result.product, quantity: 1 }]);
          }
        } else if (type === "cart") {
          const result = await showCart(session.user.email);

          if (result.success) {
            setItems(
              result.cart.map((p) => ({
                ...p,
                quantity: p.quantity || 1,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to load checkout items:", err);
        setError("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session?.user?.email, type, productId]);

  // ── Load saved address ────────────────────────────

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadAddress = async () => {
      try {
        const result = await getUserAddress(session.user.email);

        if (result.address) {
          setAddress(result.address);
          setAddressInput(result.address);
        } else {
          setEditingAddress(true);
        }
      } catch (err) {
        console.error("Failed to load address:", err);
      }
    };

    loadAddress();
  }, [session?.user?.email]);

  // ── Price calculations ────────────────────────────

  const subtotal = items.reduce(
    (acc, item) =>
      acc + (Number(item.discountPrice || item.price || 0) * Number(item.quantity || 1)),
    0
  );

  const saved = items.reduce(
    (acc, item) =>
      item.discountPrice
        ? acc +
          (Number(item.price || 0) - Number(item.discountPrice || 0)) *
            Number(item.quantity || 1)
        : acc,
    0
  );

  const total = subtotal;

  // ── Address handlers ──────────────────────────────

  const handleSaveAddress = async () => {
    if (!addressInput.trim()) return;

    try {
      setAddress(addressInput.trim());
      setEditingAddress(false);
      setAddressSaved(true);

      await saveAddress(session.user.email, addressInput.trim());

      setTimeout(() => setAddressSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save address:", err);
      setError("Failed to save address");
    }
  };

  // ── Payment ───────────────────────────────────────

  const handlePayment = async () => {
    if (!address) {
      setError("Please add a delivery address before proceeding");
      return;
    }

    if (items.length === 0) return;

    setPaymentLoading(true);
    setError(null);

    try {
      // 1. Create Razorpay order on server
      const orderResult = await createRazorpayOrder(
        total,
        session.user.email
      );

      if (!orderResult.success) {
        setError("Failed to initiate payment. Please try again.");
        setPaymentLoading(false);
        return;
      }

      // 2. Open Razorpay popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResult.amount,
        currency: "INR",
        name: "ShopX",
        description: "Order Payment",
        order_id: orderResult.orderId,

        handler: async (response) => {
          try {
            // 3. Verify and create order in DB
            const itemsSnapshot = items.map((item) => ({
              product: item._id || item.id,
              title: item.title,
              image: item.images?.[0] || item.image || "",
              price: Number(item.discountPrice || item.price || 0),
              quantity: Number(item.quantity || 1),
            }));

            const result = await verifyAndCreateOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items: itemsSnapshot,
              totalAmount: total,
              userEmail: session.user.email,
              deliveryAddress: address,
            });

            if (result.success) {
              router.push(`/orders/${result.orderId}`);
            } else {
              setError(
                "Payment verified but order creation failed. Contact support."
              );
              setPaymentLoading(false);
            }
          } catch (err) {
            console.error("Order creation failed:", err);
            setError("Payment succeeded but order creation failed.");
            setPaymentLoading(false);
          }
        },

        prefill: {
          name: session.user.name || "",
          email: session.user.email || "",
        },

        theme: {
          color: "#2563FF",
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
      setPaymentLoading(false);
    }
  };

  // ── Render loading ────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Nav />

        <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-slate-400 text-lg">
            Loading checkout...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Razorpay script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-[#F5F7FA]">
        <Nav />

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 lg:py-10">

          <h1 className="text-2xl sm:text-3xl font-bold text-[#071633] mb-6">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-[1fr_380px] gap-6">

            {/* ── LEFT ── */}
            <div className="space-y-4">

              {/* Delivery Address */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-2">
                    <MapPin size={20} className="text-blue-600" />

                    <h2 className="font-bold text-slate-900">
                      Delivery Address
                    </h2>
                  </div>

                  {!editingAddress && address && (
                    <button
                      onClick={() => setEditingAddress(true)}
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Pencil size={14} />
                      Change
                    </button>
                  )}

                </div>

                {!editingAddress && address ? (

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={16} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {session?.user?.name}
                      </p>

                      <p className="text-slate-500 text-sm mt-1 leading-6">
                        {address}
                      </p>
                    </div>

                    {addressSaved && (
                      <span className="ml-auto flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle2 size={14} />
                        Saved
                      </span>
                    )}

                  </div>

                ) : (

                  <div className="space-y-3">

                    <textarea
                      rows={3}
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      placeholder="Enter your full delivery address — house no, street, city, state, pincode"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />

                    <div className="flex gap-3">

                      <button
                        onClick={handleSaveAddress}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition"
                      >
                        Save Address
                      </button>

                      {address && (
                        <button
                          onClick={() => setEditingAddress(false)}
                          className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-medium transition"
                        >
                          Cancel
                        </button>
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* Order Items */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

                <h2 className="font-bold text-slate-900 mb-4">
                  Order Items ({items.length})
                </h2>

                <div className="space-y-4">

                  {items.map((item, index) => (

                    <div
                      key={item._id || item.id || index}
                      className="flex gap-4 pb-4 border-b border-slate-100 last:border-none last:pb-0"
                    >

                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">

                        <Image
                          src={item.images?.[0] || item.image}
                          alt={item.title || "Product"}
                          fill
                          className="object-contain p-2"
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-slate-400 text-xs mt-1">
                          Qty: {item.quantity}
                        </p>

                        <div className="flex items-center gap-2 mt-1.5">

                          <span className="font-bold text-slate-900">
                            ₹{item.discountPrice || item.price}
                          </span>

                          {item.discountPrice && (
                            <span className="text-slate-400 line-through text-sm">
                              ₹{item.price}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">

                {[
                  {
                    icon: ShieldCheck,
                    label: "Secure Payment",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Buyer Protection",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Easy Returns",
                  },
                ].map(({ icon: Icon, label }) => (

                  <div
                    key={label}
                    className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-col items-center text-center"
                  >
                    <Icon size={18} className="text-green-600" />

                    <p className="text-xs text-slate-600 mt-1.5">
                      {label}
                    </p>
                  </div>

                ))}

              </div>

            </div>

            {/* ── RIGHT — Order Summary ── */}
            <div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-6">

                <h2 className="font-bold text-slate-900 text-lg mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Subtotal ({items.length} item
                      {items.length > 1 ? "s" : ""})
                    </span>

                    <span className="font-medium text-slate-800">
                      ₹
                      {items.reduce(
                        (acc, i) =>
                          acc +
                          Number(i.price || 0) *
                            Number(i.quantity || 1),
                        0
                      )}
                    </span>

                  </div>

                  {saved > 0 && (
                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Discount
                      </span>

                      <span className="text-green-600 font-medium">
                        − ₹{saved}
                      </span>

                    </div>
                  )}

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Shipping
                    </span>

                    <span className="text-green-600 font-medium">
                      Free
                    </span>

                  </div>

                  <hr className="border-slate-100" />

                  <div className="flex justify-between">

                    <span className="font-bold text-slate-900 text-base">
                      Total
                    </span>

                    <span className="font-bold text-slate-900 text-xl">
                      ₹{total}
                    </span>

                  </div>

                  {saved > 0 && (
                    <div className="bg-green-50 rounded-2xl p-3 flex justify-between">

                      <span className="text-green-700 text-sm">
                        You save
                      </span>

                      <span className="text-green-700 font-bold">
                        ₹{saved}
                      </span>

                    </div>
                  )}

                </div>

                {error && (
                  <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={paymentLoading || !address}
                  className="mt-5 w-full bg-[#2563FF] hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition"
                >

                  {paymentLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Pay ₹{total}
                      <ChevronRight size={18} />
                    </>
                  )}

                </button>

                <p className="text-center text-xs text-slate-400 mt-3">
                  Secured by Razorpay
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
          <div className="text-slate-400 text-lg">
            Loading checkout...
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}