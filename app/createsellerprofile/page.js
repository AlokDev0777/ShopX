"use client";

import { createRetailer } from "@/actions/backend";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateRetailerPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    phone: "",
    email: "",
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
  });

  const handleChange = (e) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.storeName.trim()) return "Store name is required";
        if (!formData.description.trim()) return "Store description is required";
        if (!formData.phone.trim()) return "Phone number is required";
        if (!formData.email.trim()) return "Email is required";
        return null;

      case 2:
        if (!formData.fullName.trim()) return "Full name is required";
        if (!formData.address1.trim()) return "Address is required";
        if (!formData.city.trim()) return "City is required";
        if (!formData.state.trim()) return "State is required";
        if (!formData.pincode.trim()) return "Pincode is required";
        return null;

      case 3:
        if (!formData.accountHolder.trim()) return "Account holder name is required";
        if (!formData.accountNumber.trim()) return "Account number is required";
        if (!formData.ifsc.trim()) return "IFSC code is required";
        return null;

      default:
        return null;
    }
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step < 4) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    if (step > 1) setStep((prev) => prev - 1);
  };

  const steps = ["Store", "Address", "Bank", "Review"];

  const create = (formData, userId) => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    console.log(formData);
    console.log(userId);
    const id = createRetailer(formData, userId);
  };

  return (
    <div className="min-h-screen relative bg-gray-50 py-10 px-4">
      <div className="absolute top-5 left-5 font-inter font-bold text-2xl text-slate-900">
        Shop<span className="font-inter font-bold text-2xl text-blue-700">X</span>
      </div>

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Become a Seller</h1>
          <p className="text-gray-500 mt-2">
            Start selling on ShopX and manage your own store.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

          {/* Progress */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((item, index) => {
              const current = index + 1;
              return (
                <div key={item} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                        ${
                          current < step
                            ? "bg-blue-600 text-white"
                            : current === step
                            ? "border-2 border-blue-600 text-blue-600"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {current}
                    </div>
                    <span className="mt-2 text-sm text-gray-600">{item}</span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-3 rounded ${
                        current < step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl text-slate-700 font-semibold">
                Store Information
              </h2>

              <input
                type="text"
                name="storeName"
                placeholder="Store Name"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full border text-slate-700 border-slate-700 rounded-xl px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <textarea
                rows={4}
                name="description"
                placeholder="Store Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border text-slate-700 border-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <div className="flex gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number eg- +91 77777777"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border text-slate-700 border-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border text-slate-700 border-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl text-slate-700 font-semibold">
                Pickup Address
              </h2>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl border-slate-700 text-slate-700 placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <input
                type="text"
                name="address1"
                placeholder="Address Line 1"
                value={formData.address1}
                onChange={handleChange}
                className="w-full border rounded-xl border-slate-700 text-slate-700 placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <input
                type="text"
                name="address2"
                placeholder="Address Line 2 (Optional)"
                value={formData.address2}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 border-slate-700 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 border-slate-700 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 border-slate-700 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 border-slate-700 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl text-slate-700 font-semibold">
                Bank Details
              </h2>

              <input
                type="text"
                name="accountHolder"
                placeholder="Account Holder Name"
                value={formData.accountHolder}
                onChange={handleChange}
                className="w-full border border-slate-700 text-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full border border-slate-700 text-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code"
                value={formData.ifsc}
                onChange={handleChange}
                className="w-full border border-slate-700 text-slate-700 placeholder:text-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              />

            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-slate-700 text-xl font-semibold mb-6">
                Review Details
              </h2>

              <div className="space-y-4 text-gray-700">
                <div><strong>Store:</strong> {formData.storeName}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>City:</strong> {formData.city}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Bank Holder:</strong> {formData.accountHolder}</div>
                <div><strong>IFSC:</strong> {formData.ifsc}</div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
                By creating a seller account, you agree to follow ShopX seller guidelines.
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-3 rounded-xl text-slate-600 border-2 border-slate-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => create(formData, session?.user?.id)}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Create Seller Account
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}