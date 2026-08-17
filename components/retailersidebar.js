import React from 'react'
import { useRouter } from 'next/navigation';

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Plus,
  ArrowRight,
} from "lucide-react";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    name: "product",
    icon: Package,
  },
  {
    name: "orders",
    icon: ShoppingCart,
  },

  {
    name: "analytics",
    icon: BarChart3,
  },
  {
    name: "settings",
    icon: Settings,
  },
];

const stats = [
  {
    title: "Total Products",
    value: "128",
    change: "+12 this month",
  },
  {
    title: "Orders",
    value: "842",
    change: "+24 today",
  },
  {
    title: "Revenue",
    value: "₹1.28L",
    change: "+18%",
  },
  {
    title: "Pending Orders",
    value: "16",
    change: "Needs attention",
  },
];

const recentOrders = [
  {
    id: "#1023",
    customer: "Rahul Sharma",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#1024",
    customer: "Priya Singh",
    amount: "₹899",
    status: "Pending",
  },
  {
    id: "#1025",
    customer: "Amit Kumar",
    amount: "₹1,699",
    status: "Shipped",
  },
];

const Retailersidebar = () => {

  const router = useRouter()
  return (
          <aside className="w-64 bg-[#07132F] text-white hidden md:flex flex-col">

        <div className="px-8 py-8 border-b border-white/10">
          <h1 className="text-3xl font-bold">
            Shop<span className="text-blue-500">X</span>
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Retailer Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={()=>{router.push(`/account/retailer/${item.name}`)}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  item.active
                    ? "bg-blue-600"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
  )
}

export default Retailersidebar