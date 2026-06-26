"use client";

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
    name: "Products",
    icon: Package,
  },
  {
    name: "Orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    icon: Users,
  },
  {
    name: "Analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
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

export default function RetailerDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
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

      {/* Main */}
      <main className="flex-1 p-6 md:p-8">

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back 👋
              </h2>

              <p className="text-slate-500 mt-2">
                Here's what's happening in your store today.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 w-fit transition">
              <Plus size={20} />

              Add Product
            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <p className="text-slate-500 text-sm">
                {stat.title}
              </p>

              <h3 className="text-3xl font-bold mt-3 text-slate-900">
                {stat.value}
              </h3>

              <p className="text-blue-600 mt-3 text-sm">
                {stat.change}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="grid xl:grid-cols-3 gap-6 mt-8">

          {/* Recent Orders */}
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm">

            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-xl">
                Recent Orders
              </h3>

              <button className="text-blue-600 flex items-center gap-1">
                View All

                <ArrowRight size={18} />
              </button>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="p-6">Order ID</th>
                    <th className="p-6">Customer</th>
                    <th className="p-6">Amount</th>
                    <th className="p-6">Status</th>
                  </tr>
                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t"
                    >
                      <td className="p-6 font-medium">
                        {order.id}
                      </td>

                      <td className="p-6">
                        {order.customer}
                      </td>

                      <td className="p-6">
                        {order.amount}
                      </td>

                      <td className="p-6">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-sm p-6">

            <h3 className="font-bold text-xl mb-6">
              Quick Actions
            </h3>

            <div className="space-y-4">

              <button className="w-full p-4 rounded-2xl border hover:bg-slate-50 text-left transition">
                Add New Product
              </button>

              <button className="w-full p-4 rounded-2xl border hover:bg-slate-50 text-left transition">
                Manage Orders
              </button>

              <button className="w-full p-4 rounded-2xl border hover:bg-slate-50 text-left transition">
                View Analytics
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}