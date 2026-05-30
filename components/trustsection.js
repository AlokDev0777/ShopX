import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCcw
} from "lucide-react"

export default function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-8 rounded-3xl">
          <Truck size={40} />
          <h3 className="font-bold mt-4">
            Fast Delivery
          </h3>
        </div>

        <div className="bg-white p-8 rounded-3xl">
          <ShieldCheck size={40} />
          <h3 className="font-bold mt-4">
            Secure Payments
          </h3>
        </div>

        <div className="bg-white p-8 rounded-3xl">
          <Headphones size={40} />
          <h3 className="font-bold mt-4">
            24/7 Support
          </h3>
        </div>

        <div className="bg-white p-8 rounded-3xl">
          <RefreshCcw size={40} />
          <h3 className="font-bold mt-4">
            Easy Returns
          </h3>
        </div>

      </div>

    </section>
  )
}