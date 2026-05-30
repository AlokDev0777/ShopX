import Link from "next/link"

export default function TrendingProducts({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-bold">
          Trending Products
        </h2>

        <button className="text-blue-600 font-semibold">
          View All →
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products?.slice(0, 8).map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
          >
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300">

              <div className="relative overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  -20%
                </span>

                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                  ❤️
                </button>

              </div>

              <div className="p-5">

                <p className="text-sm text-zinc-500">
                  {product.category}
                </p>

                <h3 className="font-semibold text-lg mt-2">
                  {product.title}
                </h3>

                <div className="flex items-center mt-2">
                  ⭐⭐⭐⭐⭐
                </div>

                <div className="flex items-center gap-3 mt-4">

                  <span className="text-2xl font-bold">
                    ₹{product.price}
                  </span>

                  <span className="line-through text-zinc-400">
                    ₹{Math.round(product.price * 1.3)}
                  </span>

                </div>

                <button className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-zinc-800">
                  Add To Cart
                </button>

              </div>

            </div>
          </Link>
        ))}

      </div>

    </section>
  )
}