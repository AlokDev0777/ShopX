"use client";

import Link from "next/link";
import { User, Mail, Lock, ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

export default function SignupPage() {
  

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [caution, setCaution] = useState(false)

  const { data: session } = useSession();
  const router = useRouter();

  // If user signs in via OAuth (Google/Github), automatically send them home
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const create = async (firstName, email, password) => {
     if(firstName == "" || email == "" || password == ""){
        setCaution(true)
        return
     }

    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:firstName, email: email, password: password })
    });

    const result = await response.json();
    
    if (result.message === "exists") {
      alert("User already exists. Please log in.");
      setTimeout(() => {
        
        router.push("/login");
      }, 2000);
      return;
    }



    if (result.status === true) {
      setEmail("");
      setPassword("");
      setFirstName("");
      router.push("/");
     

  await signIn("credentials", {
    email,
    password,
    redirect: false
  })
  
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 max-w-6xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-black text-white p-12">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBag size={32} />
              <h2 className="text-3xl font-bold">
                Shop<span className="text-blue-500">X</span>
              </h2>
            </div>

            <h1 className="text-6xl font-black mt-16 leading-tight">
              Create
              <br />
              Account.
            </h1>

            <p className="text-zinc-400 mt-6 text-lg max-w-md">
              Join thousands of customers and retailers on ShopX.
            </p>
          </div>

          <div className="text-zinc-500 text-sm">
            Secure • Fast • Trusted
          </div>
        </div>

        {/* Right Side - Single Step Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center w-full">
          <h2 className="text-5xl font-black text-zinc-900">
            Sign Up
          </h2>

          <p className="text-zinc-500 mt-3">
            Create your account to continue
          </p>

          <form className="mt-10 space-y-4">
            <div className="border rounded-2xl flex items-center px-4">
              <User size={18} className="text-zinc-500" />
              <input
                type="text"
                name="Name"
                placeholder="Full Name"
                className="w-full p-4 outline-none placeholder:text-zinc-500 text-zinc-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="border rounded-2xl flex items-center px-4">
              <Mail size={18} className="text-zinc-500" />
              <input
                type="type"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 outline-none placeholder:text-zinc-500 text-zinc-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="border rounded-2xl flex items-center px-4">
              <Lock size={18} className="text-zinc-500" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-4 outline-none placeholder:text-zinc-500 text-zinc-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="border rounded-2xl flex items-center px-4">
              <Lock size={18} className="text-zinc-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-4 outline-none placeholder:text-zinc-500 text-zinc-500"
              />
            </div>

            {caution && <div className="text-base text-red-700 font-inter">
              Please fill all fields
            </div>}

            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px bg-zinc-200" />
              <span className="text-zinc-400 text-sm">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            <div className="w-[50%] mx-auto flex items-center justify-between">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="border rounded-2xl p-4 hover:bg-zinc-50"
              >
                <FcGoogle size={24} />
              </button>

              <button
                type="button"
                onClick={() => signIn("github")}
                className="border rounded-2xl p-4 hover:bg-zinc-50"
              >
                <FaGithub size={24} />
              </button>

              <button
                type="button"
                className="border rounded-2xl p-4 hover:bg-zinc-50"
              >
                <FaFacebook size={24} />
              </button>
            </div>

            <button
              type="button"
              onClick={()=>create(firstName, email, password)}
              className="w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-zinc-800 flex items-center justify-center mt-6"
            >
              <span>Create Account</span>
            </button>
          </form>

          <p className="text-center text-zinc-500 mt-6">
            Already have an account?
            <Link
              href="/login"
              className="ml-2 font-semibold text-black"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}