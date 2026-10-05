import React from 'react'

const Navskeleton = () => {
  return (

    <nav className="sticky mb-0 top-0 z-50 bg-slate-900 backdrop-blur-md border-b border-black/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo Skeleton */}
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-10 h-10 rounded-xl bg-slate-700" />
          <div className="w-24 h-7 rounded-md bg-slate-700" />
        </div>

        {/* Search Skeleton */}
        <div className="hidden md:flex items-center bg-slate-700 rounded-full w-full max-w-md h-10 animate-pulse">
          <div className="w-5 h-5 ml-4 rounded-full bg-slate-600" />
          <div className="flex-1 h-4 mx-3 rounded bg-slate-600" />
          <div className="w-16 h-10 rounded-r-full bg-slate-600" />
        </div>

        {/* Right Side Skeleton */}
        <div className="flex items-center gap-5 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-700" />
          <div className="w-6 h-6 rounded bg-slate-700" />
        </div>

      </div>
    </nav>
 

  )
}

export default Navskeleton