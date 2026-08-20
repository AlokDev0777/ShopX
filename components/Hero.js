import React from 'react'

const Hero = () => {
  return (
    <section className="w-[90%] max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:h-[25vw] lg:min-h-105 lg:max-h-137.5">

        {/* Left Large Banner */}
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-300 cursor-pointer h-62.5 sm:h-87.5 lg:h-full">
          <img
            src="/hello.png"
            alt="Fashion Banner"
            className="absolute inset-0 w-full h-full object-cover border border-blue-300"
          />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 flex flex-col gap-4 lg:h-full">

          {/* Top Medium Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-300 cursor-pointer h-62.5 sm:h-75 lg:flex-3">

            <img
              src="/fashionnew.png"   // replace with your image
              alt="Electronics"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Optional overlay */}
            {/* <div className="absolute inset-0 bg-black/20" /> */}
          </div>

          {/* Bottom Two Small Banners */}
          <div className="grid grid-cols-2 gap-4 lg:flex-2">

            {/* Fashion */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-300 cursor-pointer h-45 sm:h-55 lg:h-full">
              <img
                src="/electronics.png"
                alt="Fashion"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Grocery */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.01] transition-transform duration-300 cursor-pointer h-45 sm:h-55 lg:h-full">
              <img
                src="/groce.png"
                alt="Grocery"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero