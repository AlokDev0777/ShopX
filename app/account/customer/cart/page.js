"use client";

import Image from "next/image";
import Link from "next/link";
import { showCart } from "@/actions/backend";
import { addToCart } from "@/actions/backend";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ShieldCheck,
  RotateCcw,
  Store,
  ArrowRight,
} from "lucide-react";

import { deleteFromCart } from "@/actions/backend";
import Footer from "@/components/footer";
import Nav from "@/components/Nav";

// const cartItems = [
//   {
//     id: 1,
//     name: "ASUS Gaming V16 Laptop",
//     vendor: "TechStore",
//     image:
//       "/laptop.png",
//     price: 49999,
//     oldPrice: 64999,
//     qty: 1,
//   },
//   {
//     id: 2,
//     name: "Minimalist Vitamin C Serum",
//     vendor: "Beauty Hub",
//     image:
//       "/minimalist.webp",
//     price: 599,
//     oldPrice: 799,
//     qty: 2,
//   },
//   {
//     id: 3,
//     name: "Travel Organizer Kit",
//     vendor: "Travel Essentials",
//     image:
//       "/organizer bag.png",
//     price: 999,
//     oldPrice: 1299,
//     qty: 1,
//   },
// ];

export default function CartPage() {
   const { data: session } = useSession();
   const router = useRouter()
    const [cartItems, setCartItems] = useState([]);
  
  // const subtotal = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.qty,
  //   0
  // );

  // const discount = 4200;

  // const total = subtotal - discount;

  useEffect(() => {
      if(!session?.user?.email) return;
   
    const load = async (email) => {
  const data = await showCart(email)
  setCartItems(data.cart || []) // always fallback to empty array
}
  
  load()

  }, [session])
  
  const handleRemove = async (productId) => {
    
      await deleteFromCart(productId);
    
      setCartItems(prev =>
        prev.filter(item => item._id !== productId)
      );
    
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">

      {/* HERO */}

      <Nav/>

      <div className="max-w-7xl mx-auto px-6 pt-8">


        {/* MAIN GRID */}

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-8 space-y-6">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="
                bg-white
                rounded-[28px]
                p-5
                md:p-6
                border
                border-slate-200
                shadow-sm
                hover:shadow-xl
                transition-all
              "
              >
                <div className="flex flex-col md:flex-row gap-6">

                  {/* IMAGE */}

                  <div
                    className="
                    relative
                    w-full
                    md:w-44
                    h-44
                    rounded-3xl
                    overflow-hidden
                    bg-linear-to-br
                    from-slate-50
                    to-slate-100
                  "
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <div className="flex justify-between gap-3">

                      <div>

                        <h2
                          className="
                          text-xl
                          font-semibold
                          text-[#071633]
                        "
                        >
                          {item.title}
                        </h2>

                        <div
                          className="
                          flex
                          items-center
                          gap-2
                          mt-2
                          text-slate-500
                        "
                        >
                          <Store size={16} />
                          Sold by hello
                        </div>

                        <div
                          className="
                          inline-flex
                          mt-4
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                        "
                        >
                          Free Delivery Tomorrow
                        </div>
                      </div>

                      <button
                        onClick={()=>{handleRemove(item._id)}}
                        className="
                        h-11
                        w-11
                        rounded-xl
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-red-50
                      "
                      >
                        <Trash2
                          size={18}
                          className="text-red-500"
                        />
                      </button>
                    </div>

                    {/* PRICE */}

                    <div className="mt-5 flex items-center gap-3">

                      <span
                        className="
                        text-3xl
                        font-bold
                        text-[#071633]
                      "
                      >
                        ₹{item.price}
                      </span>

                      <span
                        className="
                        text-slate-400
                        line-through
                      "
                      >
                        ₹{Number((item.price)*1.5)}
                      </span>
                    </div>

                    {/* QTY */}

                    <div className="mt-6 flex items-center justify-between">

                      <div
                        className="
                        flex
                        items-center
                        gap-4
                        bg-slate-100
                        px-4
                        py-2
                        rounded-2xl
                      "
                      >
                        <button
                          className="
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          shadow
                          flex
                          items-center
                          justify-center
                        "
                        >
                          <Minus size={15} />
                        </button>

                        <span className="font-semibold">
                          1
                        </span>

                        <button
                          className="
                          w-8
                          h-8
                          rounded-full
                          bg-white
                          shadow
                          flex
                          items-center
                          justify-center
                        "
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <div
                        className="
                        text-lg
                        font-bold
                        text-[#071633]
                      "
                      >
                        ₹{item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}

          <div className="lg:col-span-4">

            <div
              className="
              bg-white
              rounded-4xl
              p-7
              sticky
              top-26
              shadow-lg
              border
            "
            >
              <h2
                className="
                text-2xl
                font-bold
                text-[#071633]
                mb-6
              "
              >
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    subtotl
                  </span>

                  <span className="font-semibold">
                    ₹400
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Discount
                  </span>

                  <span className="text-green-600 font-semibold">
                    -₹100
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shipping
                  </span>

                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <hr />

                <div className="flex justify-between">
                  <span
                    className="
                    text-xl
                    font-bold
                    text-[#071633]
                  "
                  >
                    Total
                  </span>

                  <span
                    className="
                    text-2xl
                    font-bold
                    text-[#071633]
                  "
                  >
                    ₹999
                  </span>
                </div>
              </div>

              <button
                className="
                mt-8
                w-full
                bg-[#2563FF]
                hover:bg-blue-700
                text-white
                py-4
                rounded-2xl
                font-semibold
                flex
                justify-center
                items-center
                gap-2
                transition
              "
               onClick={() => router.push("/checkout?type=cart")}>
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

              <div
                className="
                mt-8
                bg-blue-50
                rounded-2xl
                p-4
              "
              >
                <p className="text-sm text-slate-600">
                  You saved
                </p>

                <h3
                  className="
                  text-2xl
                  font-bold
                  text-blue-600
                "
                >
                  ₹1
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS */}

        <div className="mt-14">

          <h2
            className="
            text-3xl
            font-bold
            text-[#071633]
            mb-6
          "
          >
            You May Also Like
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                bg-white
                rounded-3xl
                h-72
                shadow-sm
              "
              />
            ))}
          </div>


        </div>

      </div>
<Footer/>
    </div>
  );
}