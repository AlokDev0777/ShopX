export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <div className="bg-black rounded-[40px] text-center text-white p-16">

        <h2 className="text-5xl font-black">
          Stay Updated
        </h2>

        <p className="text-zinc-400 mt-4">
          Get exclusive deals and product updates.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

          <input
            placeholder="Enter your email"
            className="bg-white text-black px-6 py-4 rounded-2xl md:w-112.5"
          />

          <button className="bg-blue-600 px-8 py-4 rounded-2xl">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  )
}