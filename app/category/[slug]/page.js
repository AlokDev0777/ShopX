import Link from "next/link";
import { getAllCategories, getitemsbycategory } from "@/actions/backend";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { Star } from "lucide-react";
import WishlistButton from "@/components/wishlistbtn";
import CategoryClient from "@/components/categoryclient";

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
      <CategoryClient products={products} category={capitalize(slug)} />
       
    </>
  );
}