"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import {
    User,
    ShoppingBag,
    Heart,
    MapPin,
    Settings,
    ShoppingCart,
    ChevronRight,
} from "lucide-react";

import Footer from "@/components/footer";
import Nav from "@/components/Nav";
import { checkRetailer } from "@/actions/backend";

export default function CustomerProfile() {
    const {data: session} = useSession()
    const router =  useRouter()

    const check = async (userId) => { 
        const response = await checkRetailer(userId)
        if(response.retailerId){
            router.push("/account/retailer")
            return;
        }

        router.push("/createsellerprofile")

     }

    useEffect(() => {
    if (!session) {
        <>
        <Nav />
            <main className="min-h-screen bg-zinc-200">
                <div>
                <div className="bg-slate-800 text-xl text-white">Login</div>
                <h3 className="text-slate-700">You need to be logged in to view this page.</h3>
                <p className="text-slate-600">Please log in to access your account.</p>
                </div>
            </main>
            </>
    }
}, [session, router]);

    return (
        <>
            <Nav />
            <main className="min-h-screen bg-zinc-200">

                {/* Header */}

                <div>

                </div>

                <section className="max-w-7xl mx-auto px-6 pt-8">

                    <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-700 p-6 text-white">

                        <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-white/10 to-transparent" />

                        <div className="relative flex items-center gap-6">

                            <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center text-4xl font-black">
                                {session?.user?.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>
                                <p className="text-zinc-300">
                                    Welcome Back
                                </p>

                                <h2 className=" text-2xl font-black mt-1">
                                    {session?.user?.name} 
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    Manage orders, wishlist and account settings
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

                <div className="max-w-7xl mx-auto px-6 py-8">

                    {/* Stats */}


                    {/* Account Sections */}

                    <section className="mt-10">

                        <h2 className="text-2xl text-zinc-900 font-bold mb-5">
                            Manage Account
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            {/* 1. Added 'group' to the button classes */}
                            
                            <button onClick={()=>{router.push("/account/customer/myorders")}} className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
                                <div className="flex justify-between items-center">
                                     <div>
                                        <ShoppingBag className="text-zinc-700" />
                                        <h3 className="text-xl text-zinc-700 font-bold mt-4">
                                            My Orders
                                        </h3>
                                        <p className="text-zinc-500 mt-2">
                                            Track and manage your orders.
                                        </p>
                                    </div>

                                    <ChevronRight className="text-zinc-700 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                </div>
                            </button>

                            <button onClick={()=>{router.push("/account/customer/wishlist")}} className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Heart className="text-zinc-700" />
                                        <h3 className="text-xl text-zinc-700 font-bold mt-4">
                                            Wishlist
                                        </h3>
                                        <p className="text-zinc-500 mt-2">
                                            Saved products for later.
                                        </p>
                                    </div>
                                    <ChevronRight className="text-zinc-700 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                </div>
                            </button>


                           


                            <button onClick={()=>{router.push("/account/customer/settings")}} className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Settings className="text-zinc-700" />
                                        <h3 className="text-xl text-zinc-700 font-bold mt-4">
                                            Account Settings
                                        </h3>
                                        <p className="text-zinc-500 mt-2">
                                            Security and profile settings.
                                        </p>
                                    </div>

                                    <ChevronRight className="text-zinc-700 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                </div>
                            </button>

                            <button onClick={()=>{check()}} className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Settings className="text-zinc-700" />
                                        <h3 className="text-xl text-zinc-700 font-bold mt-4">
                                            Your store
                                        </h3>
                                        <p className="text-zinc-500 mt-2">
                                            Sell goods on shopX
                                        </p>
                                    </div>

                                    <ChevronRight className="text-zinc-700 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                </div>
                            </button>

                        </div>

                    </section>

                    {/* Recent Orders */}

                

                </div>

            </main>
            <Footer />
        </>
    );
}
