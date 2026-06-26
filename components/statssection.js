export default function StatsSection() {
  return (
    <section className="bg-black text-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h3 className="text-6xl font-black">
              50K+
            </h3>
            <p className="text-zinc-400 mt-3">
              Happy Customers
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black">
              10K+
            </h3>
            <p className="text-zinc-400 mt-3">
              Products Sold
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black">
              4.9★
            </h3>
            <p className="text-zinc-400 mt-3">
              Customer Rating
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black">
              100+
            </h3>
            <p className="text-zinc-400 mt-3">
              Brands
            </p>
          </div>

        </div>

      </div>

    </section>
  )
}

