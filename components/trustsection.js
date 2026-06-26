export default function TrustSection() {
  const items = [
    {
      title: "Free Fast Delivery",
      desc: "Orders above ₹499 get free delivery in 2–3 days",
      iconColor: "#3b82f6",
      cardBg: "bg-blue-950",
      iconBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: (
        <svg width="22" height="22" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v4h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: "Secure Payments",
      desc: "256-bit SSL encryption. Your data is always safe",
      iconColor: "#16a34a",
      cardBg: "bg-green-950",
      iconBg: "bg-green-500/10",
      border: "border-green-500/20",
      icon: (
        <svg width="22" height="22" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      desc: "Real humans available round the clock to help you",
      iconColor: "#a855f7",
      cardBg: "bg-purple-950",
      iconBg: "bg-purple-500/10",
      border: "border-purple-500/20",
      icon: (
        <svg width="22" height="22" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
        </svg>
      ),
    },
    {
      title: "Easy Returns",
      desc: "Not satisfied? Return within 7 days, no questions asked",
      iconColor: "#f59e0b",
      cardBg: "bg-amber-950",
      iconBg: "bg-amber-500/10",
      border: "border-amber-500/20",
      icon: (
        <svg width="22" height="22" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-slate-900 pt-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-500 text-sm font-bold tracking-widest uppercase mb-3">
            Why shop with us
          </p>
          <h2 className="text-2xl font-black text-white">
            Everything you need, nothing you don't
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className={`${item.cardBg} ${item.border} border rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition duration-300`}
            >
              <div className="flex gap-1 items-center">
                <div className={`${item.iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-1">{item.title}</h3></div>

              <div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}