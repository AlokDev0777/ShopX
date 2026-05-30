import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-black">
              ShopSphere
            </h2>

            <p className="text-zinc-400 mt-4">
              Discover premium products from top brands
              around the world.
            </p>

          </div>

          {/* Shop */}

          <div>

            <h3 className="font-semibold text-lg mb-4">
              Shop
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <Link href="/">
                  Fashion
                </Link>
              </li>

              <li>
                <Link href="/">
                  Electronics
                </Link>
              </li>

              <li>
                <Link href="/">
                  Fitness
                </Link>
              </li>

              <li>
                <Link href="/">
                  Accessories
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-semibold text-lg mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <Link href="/">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="/">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/">
                  Blog
                </Link>
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h3 className="font-semibold text-lg mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-zinc-400">

              <li>
                <Link href="/">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/">
                  Returns
                </Link>
              </li>

              <li>
                <Link href="/">
                  Shipping
                </Link>
              </li>

              <li>
                <Link href="/">
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-zinc-500">
            © 2026 ShopSphere. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>

          </div>

        </div>

      </div>

    </footer>
  )
}