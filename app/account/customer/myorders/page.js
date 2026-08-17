"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { getUserOrders } from "@/actions/backend";
import {
  ShoppingBag,
  ChevronRight,
  PackageSearch,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
} from "lucide-react";

// Status config — color + icon + label for each order status
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: Clock,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    icon: CheckCircle2,
  },
  shipped: {
    label: "Shipped",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: PackageCheck,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-500 bg-red-50 border-red-200",
    icon: XCircle,
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const load = async () => {
      setLoading(true);
      const result = await getUserOrders(session.user.email);
      if (result.success) setOrders(result.orders);
      setLoading(false);
    };

    load();
  }, [session]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Nav />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 lg:py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#071633]">My Orders</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {orders.length > 0
                ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed`
                : "Your order history"}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-slate-200 p-6 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-slate-100 rounded-full w-2/3" />
                    <div className="h-3 bg-slate-100 rounded-full w-1/3" />
                    <div className="h-3 bg-slate-100 rounded-full w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <PackageSearch
              size={56}
              className="mx-auto text-slate-200 mb-4"
            />
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              No orders yet
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Looks like you haven't placed any orders. Start shopping!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition text-sm"
            >
              Browse Products
              <ChevronRight size={16} />
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 sm:p-6"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs text-slate-400 font-medium">
                        ORDER ID
                      </p>
                      <p className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                        #{order._id.toString().slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />
                </div>

                {/* Order Items */}
                <div className="py-4 space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-[#071633] line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="font-bold text-slate-900 text-sm mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400">Total Paid</p>
                    <p className="text-xl font-bold text-[#071633]">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Payment badge */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-medium ${
                        order.isPaid
                          ? "text-green-600 bg-green-50 border-green-200"
                          : "text-red-500 bg-red-50 border-red-200"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>

                    <Link
                      href={`/orders/${order._id}`}
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                    >
                      View Details
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}