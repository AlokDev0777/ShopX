import Link from "next/link";
import { getAllCategories, getitemsbycategory } from "@/actions/backend";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Star } from "lucide-react";
import WishlistButton from "@/components/wishlistbtn";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${capitalize(slug)} | MyStore` };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const { success, products } = await getitemsbycategory(slug);

  if (!success || products.length === 0) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="px-4 py-8 min-h-screen bg-slate-100">
        <section className=" px-[6vw] mx-auto">
          <div>
            <h1 className="text-2xl text-slate-900 font-bold mb-8 mb-3 capitalize">{slug} Products</h1>

            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4">
              {products.map((product) => (
                <div key={product._id} className="group shrink-0 w-59">
                  <Link href={`/product/${product._id}`}>
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 group-hover:shadow-lg">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <WishlistButton productId={product._id} />
                    </div>

                    <div className="mt-3">
                      <h3 className="mt-1 font-roboto text-base text-slate-900 line-clamp-2">
                        {product.title}
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
                          ₹{product.price}
                        </span>
                        <span className="text-slate-400 line-through">
                          ₹{Math.round(product.price * 1.3)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}