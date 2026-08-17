"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
                                A
                            </div>

                            <div>
                                <p className="text-zinc-300">
                                    Welcome Back
                                </p>

                                <h2 className=" text-2xl font-black mt-1">
                                    Alok Kumari
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

                        <div className="grid md:grid-cols-3 gap-5">

                            {/* 1. Added 'group' to the button classes */}
                            <button className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
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

                            <button className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
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


                            <button className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <MapPin className="text-zinc-700" />
                                        <h3 className="text-xl text-zinc-700 font-bold mt-4">
                                            Addresses
                                        </h3>
                                        <p className="text-zinc-500 mt-2">
                                            Manage shipping addresses.
                                        </p>
                                    </div>

                                    <ChevronRight className="text-zinc-700 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                                </div>
                            </button>


                            <button className="group cursor-pointer bg-white border border-zinc-100 rounded-3xl p-6 text-left w-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:shadow-zinc-500 hover:-translate-y-1">
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

                    <section className="mt-10">

                        <div className="bg-white rounded-3xl border p-6">

                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl text-zinc-900 font-bold">
                                    Recent Orders
                                </h2>

                                <button className="text-sm text-zinc-700 font-medium">
                                    View All
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">

                                <div className="border border-zinc-700 rounded-2xl p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            Nike Air Max
                                        </h3>

                                        <p className="text-sm text-zinc-500">
                                            Order #12345
                                        </p>
                                    </div>

                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                        Delivered
                                    </span>
                                </div>

                                <div className="border border-zinc-700 rounded-2xl p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            Wireless Headphones
                                        </h3>

                                        <p className="text-sm text-zinc-500">
                                            Order #12346
                                        </p>
                                    </div>

                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                        Processing
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>
            <Footer />
        </>
    );
}
