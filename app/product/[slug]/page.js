import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/actions/backend";
import Nav from "@/components/Nav";
import ProductGallery from "@/components/productgallery";
import ProductTabs from "@/components/producttab";
import Rightside from "@/components/rightside";
import Script from "next/script";

import {
  ShoppingCart,
  Store,
  Truck,
  ShieldCheck,
  ArrowRight,
  Star,
  BadgeCheck,
  RotateCcw,
} from "lucide-react";

export default async function ProductPage({ params }) {

  const { slug } = await params;
  const data = await getProduct(slug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const { product, seller, relatedProducts } = data;

  return (
<>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <div className="min-h-screen bg-[#F5F7FA] w-full">
      <Nav />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 lg:py-8">

        <div className="grid lg:grid-cols-[1fr_1.10fr] gap-4 lg:gap-8 items-start">

          {/* LEFT — Gallery */}
          <div className="lg:sticky lg:top-24 self-start">
            <ProductGallery product={product} />
          </div>

          {/* RIGHT — Product Details */}
          <div className="lg:sticky lg:top-24 h-fit">
             <Rightside product= {product} />
          </div>
        </div>

        {/* PRODUCT DESCRIPTION */}
        

<div className="my-10">
<ProductTabs product={product} />
</div>
        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mb-6 lg:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-[#071633] mb-4 sm:mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item._id}`}
                  className="rounded-2xl sm:rounded-[28px] overflow-hidden border shadow-sm hover:shadow-xl transition-all bg-white"
                >
                  <div className="relative h-40 sm:h-60 bg-slate-50">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="object-contain p-3 sm:p-4"
                    />
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="font-semibold line-clamp-2 text-[#071633] text-sm sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-lg sm:text-2xl font-bold">
                      ₹{item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}