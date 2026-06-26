"use client";

import {
  PackageCheck,
  Truck,
  Clock,
  XCircle,
  Eye,
  Search,
} from "lucide-react";

const orderStats = [
  {
    title: "Total Orders",
    value: "1,245",
    icon: PackageCheck,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Pending",
    value: "18",
    icon: Clock,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    title: "Shipped",
    value: "42",
    icon: Truck,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    title: "Cancelled",
    value: "6",
    icon: XCircle,
    bg: "bg-red-100",
    text: "text-red-600",
  },
];

const orders = [
  {
    id: "#ORD1024",
    customer: "Rahul Sharma",
    date: "12 Jun 2026",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#ORD1025",
    customer: "Priya Singh",
    date: "12 Jun 2026",
    amount: "₹899",
    status: "Pending",
  },
  {
    id: "#ORD1026",
    customer: "Amit Kumar",
    date: "11 Jun 2026",
    amount: "₹1,699",
    status: "Shipped",
  },
  {
    id: "#ORD1027",
    customer: "Neha Verma",
    date: "11 Jun 2026",
    amount: "₹599",
    status: "Cancelled",
  },
  {
    id: "#ORD1028",
    customer: "Karan Patel",
    date: "10 Jun 2026",
    amount: "₹3,299",
    status: "Delivered",
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm p-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="text-slate-500 mt-2">
          Track and manage all customer orders.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {orderStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-500 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {stat.value}
                  </h2>

                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}
                >
                  <Icon
                    size={28}
                    className={stat.text}
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search order..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-x-auto mt-8">

        <table className="w-full min-w-[850px]">

          <thead>

            <tr className="border-b text-left text-slate-500">

              <th className="p-6">Order ID</th>
              <th className="p-6">Customer</th>
              <th className="p-6">Date</th>
              <th className="p-6">Amount</th>
              <th className="p-6">Status</th>
              <th className="p-6">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-b last:border-0 hover:bg-slate-50 transition"
              >

                <td className="p-6 font-semibold">
                  {order.id}
                </td>

                <td className="p-6">
                  {order.customer}
                </td>

                <td className="p-6 text-slate-600">
                  {order.date}
                </td>

                <td className="p-6 font-semibold">
                  {order.amount}
                </td>

                <td className="p-6">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

                <td className="p-6">

                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">

                    <Eye size={18} />

                    View

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}