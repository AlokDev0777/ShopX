"use client";

import AccountSidebar from "@/components/customersidepanel";
import Image from "next/image";
import { showWishlist } from "@/actions/backend";
import { useSession } from "next-auth/react";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteFromWishlist } from "@/actions/backend";

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlistItems, setWishlistItems] = useState([]);


  useEffect(() => {
    const load = async () => {
      if (!session?.user?.email) return;

      const products = await showWishlist();

      const items = products.wishlist.map((item) => ({
        id: item._id.toString(),
        title: item.title,
        category: item.category,
        price: item.price,
        oldPrice: Math.round(item.price * 1.3),
        images: item.images,
      }));

      setWishlistItems(items);
    };

    load();
  }, [session]);

 const handleremove = async (productId) => {
  await deleteFromWishlist(productId);

  setWishlistItems(prev =>
    prev.filter(item => item.id !== productId)
  );
};
  

  return (
    <div className="flex bg-[#F5F7FA] min-h-screen">
      <AccountSidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#071633]">
            My Wishlist ({wishlistItems.length})
          </h1>

          <select className="px-5 py-3 rounded-xl border bg-white">
            <option>Newest</option>
            <option>Price Low</option>
            <option>Price High</option>
          </select>
        </div>

        {/* Wishlist Items */}
        <div className="flex flex-col gap-6 mt-10">
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center">
              <h2 className="text-xl font-semibold text-slate-700">
                Your wishlist is empty
              </h2>
              <p className="text-slate-500 mt-2">
                Start adding products to see them here.
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[28px] p-4 flex gap-6 shadow-sm hover:shadow-md transition-all"
              >
                {/* Product Image */}
                <div className="relative h-40 w-40 shrink-0 bg-zinc-100 rounded-2xl overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="object-contain p-4"
                  />
                </div>

                {/* Product Info */}
                <div className="grow flex flex-col justify-center">
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>

                  <h3 className="text-base font-medium text-[#071633] mt-1">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex gap-3 items-center">
                    <span className="text-2xl font-bold text-black">
                      ₹{item.price}
                    </span>

                    <span className="line-through text-slate-400">
                      ₹{item.oldPrice}
                    </span>
                  </div>

                  <button className="mt-4 bg-[#2563FF] text-white py-2 px-6 rounded-xl font-medium hover:bg-blue-700 w-fit">
                    Add To Cart
                  </button>
                </div>

                {/* Remove Button */}
                <div className="flex items-start pt-2">
                  <button onClick={()=>{handleremove(item.id)}} className="p-3 bg-red-50 rounded-full hover:bg-red-100 transition-colors">
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}