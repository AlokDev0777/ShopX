import Link from "next/link";
import { getProductsByCategory, getAllCategories } from "@/actions/backend";
import Image from "next/image";

import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { getitemsbycategory } from "@/actions/backend";

// Pre-generate a static page for each category (optional, for performance)
export async function generateStaticParams() {
  const categories = await getAllCategories();
  console.log("Categories fetched for static params:", categories);
  
  return categories.map((cat) => ({ slug: cat }));
}

// Dynamic <title> per category
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${capitalize(slug)} | MyStore`,
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const { success, products } = await getitemsbycategory(slug);
  console.log("products are:", products);
  if (!success || products.length === 0) {
    // Shows Next.js 404 page if category doesn't exist / has no products
    console.log(`No products found for category: ${slug}. Triggering 404.`);
    notFound();
  }

  return (<>
     <Nav/>
    <main className="px-4 py-8 min-h-screen  bg-slate-100">
      <section className="grid-cols-2 mx-auto justify-between">
        <div className="bg-white text-lg"></div>
        <div>
                <h1 className="text-2xl font-bold mb-6 capitalize">
        {slug} Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id.toString()}
            className="border rounded-xl p-3 hover:shadow-lg transition-shadow"
          >
            <div className="relative w-full h-40 mb-3">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="font-medium text-sm">{product.title}</h2>
            <p className="text-gray-700 font-semibold">₹{product.price}</p>
            <Link
              href={`/product/${product._id.toString()}`}
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              View Details →
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