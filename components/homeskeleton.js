"use client";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] animate-pulse">

      {/* ========================================
          CATEGORY NAVIGATION
      ======================================== */}

      <div className="w-full px-6 md:px-10 lg:px-16 pt-4">

        <div className="flex items-center justify-between gap-6 overflow-hidden">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              key={item}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-full bg-gray-200" />

              {/* Category name */}
              <div className="w-14 h-3 rounded-full bg-gray-200" />
            </div>
          ))}

        </div>

      </div>


      {/* ========================================
          HERO SECTION
      ======================================== */}

      <section className="px-6 md:px-10 lg:px-16 mt-4">

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.15fr] gap-4">

          {/* LEFT LARGE HERO */}

          <div className="h-[450px] lg:h-[450px] rounded-[24px] bg-gray-200" />


          {/* RIGHT HERO AREA */}

          <div className="grid grid-rows-[1.5fr_1fr] gap-4">

            {/* TOP RIGHT BANNER */}

            <div className="rounded-[24px] bg-gray-200 min-h-[260px]" />


            {/* BOTTOM TWO BANNERS */}

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-[24px] bg-gray-200" />

              <div className="rounded-[24px] bg-gray-200" />

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          TRENDING HEADER
      ======================================== */}

      <section className="px-6 md:px-10 lg:px-16 mt-16">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            {/* Section icon */}

            <div className="w-12 h-12 rounded-xl bg-gray-200" />

            <div>

              {/* Heading */}

              <div className="h-8 w-52 bg-gray-200 rounded-lg" />

              {/* Subtitle */}

              <div className="h-4 w-64 bg-gray-200 rounded-md mt-2" />

            </div>

          </div>


          {/* View all */}

          <div className="h-5 w-20 bg-gray-200 rounded-md" />

        </div>

      </section>


      {/* ========================================
          TRENDING PRODUCTS
      ======================================== */}

      <section className="px-6 md:px-10 lg:px-16 mt-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {[1, 2, 3, 4, 5].map((item) => (
            <ProductSkeleton key={item} />
          ))}

        </div>

      </section>


      {/* ========================================
          CATEGORY SECTION
      ======================================== */}

      <section className="px-6 md:px-10 lg:px-16 mt-16">

        <div className="bg-white rounded-[32px] overflow-hidden">

          {/* SECTION HEADER */}

          <div className="p-6 flex items-center justify-between border-b border-gray-100">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-gray-200" />

              <div>

                <div className="h-7 w-48 bg-gray-200 rounded-lg" />

                <div className="h-4 w-56 bg-gray-200 rounded-md mt-2" />

              </div>

            </div>

            <div className="h-5 w-20 bg-gray-200 rounded-md" />

          </div>


          {/* PRODUCTS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-5 border-r border-gray-100 last:border-r-0"
              >
                <ProductSkeleton />
              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ========================================
          ANOTHER SECTION
      ======================================== */}

      <section className="px-6 md:px-10 lg:px-16 mt-16 pb-16">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-gray-200" />

            <div>

              <div className="h-7 w-48 bg-gray-200 rounded-lg" />

              <div className="h-4 w-60 bg-gray-200 rounded-md mt-2" />

            </div>

          </div>

          <div className="h-5 w-20 bg-gray-200 rounded-md" />

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          {[1, 2, 3, 4].map((item) => (
            <ProductSkeleton key={item} />
          ))}

        </div>

      </section>

    </div>
  );
};


/* ============================================
   PRODUCT SKELETON
============================================ */

const ProductSkeleton = () => {
  return (
    <div>

      {/* IMAGE */}

      <div className="relative aspect-square rounded-[28px] bg-gray-200 overflow-hidden">

        {/* HEART */}

        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-300" />

      </div>


      {/* PRODUCT INFORMATION */}

      <div className="mt-4 px-1">

        {/* TITLE */}

        <div className="h-5 bg-gray-200 rounded-md w-[90%]" />

        <div className="h-5 bg-gray-200 rounded-md w-[65%] mt-2" />


        {/* RATING */}

        <div className="flex gap-1 mt-3">

          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className="w-4 h-4 bg-gray-200 rounded-sm"
            />
          ))}

        </div>


        {/* PRICE */}

        <div className="flex items-center gap-2 mt-3">

          <div className="w-20 h-6 bg-gray-200 rounded-md" />

          <div className="w-16 h-5 bg-gray-200 rounded-md" />

        </div>

      </div>

    </div>
  );
};


export default HomeSkeleton;