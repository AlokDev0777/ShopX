import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-black">
              Shop<span className="text-blue-600">X</span>
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

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Fashion
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link  href="/">
                  Electronics
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Fitness
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
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

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  About Us
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Careers
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Contact
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
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

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Help Center
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Returns
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Shipping
                </Link>
              </li>

              <li className="transition-all duration-300 hover:text-white hover:font-medium hover:translate-x-1 ">
                <Link href="/">
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-zinc-500">
            © 2026 ShopX. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <a href="#" className="transition-all duration-300 hover:text-white hover:font-medium">
              Instagram
            </a>
            <a href="#" className="transition-all duration-300 hover:text-white hover:font-medium">
              Twitter
            </a>
            <a href="#" className="transition-all duration-300 hover:text-white hover:font-medium">
              Facebook
            </a>
            <a href="#" className="transition-all duration-300 hover:text-white hover:font-medium">
              LinkedIn
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}