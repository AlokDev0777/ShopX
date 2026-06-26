      <aside className="w-64 bg-[#07132F] text-white hidden md:flex flex-col">

        <div className="px-8 py-8 border-b border-white/10">
          <h1 className="text-3xl font-bold">
            Shop<span className="text-blue-500">X</span>
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Retailer Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                  item.active
                    ? "bg-blue-600"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>