"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { wishlist, showWishlist } from "@/actions/backend";

export default function WishlistButton({ productId }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const loadWishlist = async () => {
      if (!session?.user?.email) return;
      const data = await showWishlist();
      const ids = data.wishlist.map((item) => item._id.toString());
      setIsWishlisted(ids.includes(productId.toString()));
    };
    loadWishlist();
  }, [session, productId]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.email) return;
    const result = await wishlist(productId);
    setIsWishlisted(result.isWishlisted);
  };

  return (
    <button
      className="absolute top-3 right-3 h-10 w-10 rounded-full bg-slate-200 shadow-md flex items-center justify-center"
      onClick={handleClick}
    >
      <Heart className={isWishlisted ? "fill-black text-black" : "text-gray-500"} />
    </button>
  );
}