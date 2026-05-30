export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="relative overflow-hidden rounded-[40px]">

        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
          alt=""
          className="h-112.5 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col justify-center px-14">

          <span className="text-white text-sm mb-4">
            LIMITED TIME OFFER
          </span>

          <h2 className="text-white text-6xl font-black">
            Summer Sale
          </h2>

          <p className="text-zinc-300 text-xl mt-4">
            Up To 50% OFF
          </p>

          <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl w-fit font-semibold">
            Shop Collection
          </button>

        </div>

      </div>

    </section>
  )
}