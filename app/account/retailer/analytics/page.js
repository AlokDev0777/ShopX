"use client";

import {
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "₹2.48L",
    growth: "+18.2%",
    icon: IndianRupee,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Orders",
    value: "1,245",
    growth: "+8.4%",
    icon: ShoppingBag,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Conversion",
    value: "3.4%",
    growth: "+0.8%",
    icon: TrendingUp,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    title: "Avg. Rating",
    value: "4.8",
    growth: "+0.2",
    icon: Star,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
];

const monthlySales = [
  { month: "Jan", sales: 42 },
  { month: "Feb", sales: 58 },
  { month: "Mar", sales: 49 },
  { month: "Apr", sales: 74 },
  { month: "May", sales: 68 },
  { month: "Jun", sales: 89 },
];

const topProducts = [
  {
    name: "ASUS Gaming Laptop",
    sold: 86,
    revenue: "₹42,999",
  },
  {
    name: "Wireless Headphones",
    sold: 74,
    revenue: "₹18,999",
  },
  {
    name: "Smart Watch",
    sold: 58,
    revenue: "₹12,499",
  },
];

export default function AnalyticsPage() {
  const maxSales = Math.max(
    ...monthlySales.map((item) => item.sales)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm p-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2">
          Understand how your store is performing.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-slate-500 text-sm">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {stat.value}
                  </h2>

                  <p className="text-green-600 text-sm mt-2">
                    {stat.growth}
                  </p>
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

      {/* Sales Chart */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-xl font-bold">
              Monthly Sales
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Last 6 months performance
            </p>
          </div>

        </div>

        <div className="flex items-end justify-between gap-4 h-64">

          {monthlySales.map((item) => (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className="w-full max-w-[48px] bg-blue-600 rounded-t-2xl transition-all hover:bg-blue-700"
                style={{
                  height: `${
                    (item.sales / maxSales) * 180
                  }px`,
                }}
              />

              <span className="mt-4 text-sm text-slate-500">
                {item.month}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Top Products */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

        <div className="mb-6">

          <h2 className="text-xl font-bold">
            Top Products
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Best performing products this month
          </p>

        </div>

        <div className="space-y-4">

          {topProducts.map((product) => (

            <div
              key={product.name}
              className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-2xl p-5 hover:bg-slate-50 transition"
            >

              <div>

                <h3 className="font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  {product.sold} units sold
                </p>

              </div>

              <p className="font-bold text-slate-900 mt-3 md:mt-0">
                {product.revenue}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}