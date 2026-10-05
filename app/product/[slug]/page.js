import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/actions/backend";
import Nav from "@/components/Nav";
import ProductGallery from "@/components/productgallery";
import ProductTabs from "@/components/producttab";
import Rightside from "@/components/rightside";
import Script from "next/script";
import Footer from "@/components/footer";

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
                          href={`/product/${item._id}`}
                          key={item._id}
                          className="group shrink-0 w-59"
                        >
                          <div>
                            <div
                              className="
                                relative
                                aspect-square
                                overflow-hidden
                                rounded-3xl
                                bg-white
                                border
                                border-zinc-200
                                shadow-sm
                                transition-all
                                duration-300
                                group-hover:shadow-lg
                              "
                            >
                              <img
                                src={item.images[0]}
                                alt={item.title}
                                className="
                                  w-full
                                  h-full
                                  object-contain
                                  transition-transform
                                  duration-500
                                  group-hover:scale-105
                                "
                              />
              
                              
                            </div>
              
                            <div className="mt-3">
                              <h3
                                className="
                                  mt-1
                                  font-roboto
                                  text-base
                                  text-slate-900
                                  line-clamp-2
                                "
                              >
                                {item.title}
                              </h3>
              
                              <div className="mt-2 flex gap-0.5">
                                <Star size={15} className="fill-blue-800" />
                                <Star size={15} className="fill-blue-800" />
                                <Star size={15} className="fill-blue-800" />
                                <Star size={15} className="fill-blue-800" />
                                <Star size={15} />
                              </div>
              
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xl font-inter font-extrabold text-slate-900">
                                  ₹{item.price}
                                </span>
              
                                <span className="text-slate-400 line-through">
                                  ₹{Math.round(item.price * 1.3)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
              ))}
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
    </>
  );
}