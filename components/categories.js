const categories = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050"
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    name: "Fitness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  }
]

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="flex justify-between mb-10">
        <h2 className="text-4xl font-bold">
          Shop By Category
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((category) => (
          <div
            key={category.name}
            className="group bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition"
          >
            <img
              src={category.image}
              alt=""
              className="h-44 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-center">
                {category.name}
              </h3>
            </div>
          </div>
        ))}

      </div>

    </section>
  )
}