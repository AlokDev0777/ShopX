"use client";

import { Store, Shield, Upload } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm p-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your store information and account settings.
        </p>

      </div>

      {/* Store Information */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Store className="text-blue-600" size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Store Information
            </h2>

            <p className="text-slate-500 text-sm">
              Update your basic store details.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Store Name
            </label>

            <input
              type="text"
              defaultValue="ShopX Store"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              defaultValue="seller@shopx.com"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              defaultValue="+91 9876543210"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              GST Number
            </label>

            <input
              type="text"
              placeholder="Enter GST Number"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        <div className="mt-6">

          <label className="block text-sm font-medium mb-2 text-slate-700">
            Store Address
          </label>

          <textarea
            rows={4}
            placeholder="Enter store address..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Store Branding */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

        <h2 className="text-xl font-bold mb-2">
          Store Branding
        </h2>

        <p className="text-slate-500 text-sm mb-6">
          Customize how your store appears.
        </p>

        <label className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">

          <Upload
            size={40}
            className="text-blue-600 mb-4"
          />

          <h3 className="font-semibold text-slate-900">
            Upload Store Logo
          </h3>

          <p className="text-slate-500 text-sm mt-2">
            PNG or JPG up to 5MB
          </p>

          <input
            type="file"
            className="hidden"
          />

        </label>

      </div>

      {/* Security */}
      <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
            <Shield className="text-red-600" size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Security
            </h2>

            <p className="text-slate-500 text-sm">
              Change your account password.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Current Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">

        <button
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-2xl font-semibold shadow-sm"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}