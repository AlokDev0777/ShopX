"use client"
import { Store, ArrowRight } from "lucide-react";
import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import {
  Mail,
  Lock,
  ShoppingBag,
} from "lucide-react";


import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";



export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    })
  };


  useEffect(() => {
    if (session) {
      router.push("/")
    }


  }, [session])


  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-black text-white p-12">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBag size={32} />
              <h2 className="text-3xl font-bold">Shop<span className="text-blue-500">X</span></h2>
            </div>

            <h1 className="text-6xl font-black mt-16 leading-tight">
              Welcome
              <br />
              Back.
            </h1>

            <p className="text-zinc-400 mt-6 text-lg max-w-md">
              Access your account, manage orders, track shipments,
              and continue your shopping journey.
            </p>
          </div>

          <div className="text-zinc-500 text-sm">
            Trusted by thousands of customers and retailers.
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-4xl">

            <div className="flex justify-center">
              <div className="bg-black text-white p-4 rounded-2xl">
                <ShoppingBag size={30} />
              </div>
            </div>

            <h1 className="text-4xl font-black text-zinc-900 text-center mt-6">
              Login
            </h1>

            <p className="text-center text-zinc-500 mt-2">
              Continue shopping from your account
            </p>

            <div className="mt-8 space-y-4">

              <div className="border rounded-2xl flex items-center px-4">
                <Mail className="text-zinc-500" size={18} />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 outline-none placeholder:text-zinc-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="border rounded-2xl flex items-center px-4">
                <Lock className="text-zinc-500" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 outline-none placeholder:text-zinc-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button onClick={() => { handleLogin(email, password) }} className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-zinc-800">
                Log In
              </button>

            </div>

            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px bg-zinc-200" />
              <span className="text-zinc-400 text-sm">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            <div className="w-[50%] mx-auto flex items-center justify-between">

              <button onClick={() => signIn("google")} className="border  text-zinc-300 rounded-2xl p-4 hover:bg-zinc-50">
                <FcGoogle size={24} />
              </button>

              <button onClick={() => signIn("github")} className="border text-zinc-300 rounded-2xl p-4 hover:bg-zinc-50">
                <FaGithub size={24} />
              </button>

              <button className="border text-zinc-300 rounded-2xl p-4 hover:bg-zinc-50">
                <FaFacebook size={24} />
              </button>

            </div>

            <div className="text-center mt-8">
              <Link href="#" className="text-zinc-500">
                Forgot Password?
              </Link>
            </div>

            <div className="text-center mt-4">
              <span className="text-zinc-500">
                Don't have an account?
              </span>

              <Link
                href="/signup"
                className="ml-2 font-semibold text-zinc-600"
              >
                Sign Up
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}