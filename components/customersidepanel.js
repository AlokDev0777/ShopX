"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/account/customer",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    href: "/account/customer/myorders",
  },
  {
    name: "Wishlist",
    icon: Heart,
    href: "/account/customer/wishlist",
  },
  {
    name: "Cart",
    icon: ShoppingCart,
    href: "/account/customer/cart",
  },

  {
    name: "Settings",
    icon: Settings,
    href: "/account/customer/settings",
  },
];

export default function AccountSidebar() {
  return (
    <aside className="w-72 bg-[#071633] text-white min-h-screen sticky top-0">

      <div className="p-8 border-b border-white/10">
        <h1 className="text-3xl font-bold">
          Shop<span className="text-blue-500">X</span>
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Account Center
        </p>
      </div>

      <nav className="p-5 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-300 hover:bg-blue-600 hover:text-whitetransition-all"
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="absolute bottom-6 w-full px-5">
        <button
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-2xl flex items-center gap-2 justify-center"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}