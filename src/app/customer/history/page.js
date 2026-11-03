export default function HistoryPage() {
  const mockOrders = [
    {
      id: "ORD-9482",
      date: "24 Oct 2026",
      status: "Entregado",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      items: "2x Garrafón 20L (Llenado)",
      address: "Calle Mina #402, Col. Centro",
      total: "$80.00 MXN",
    },
    {
      id: "ORD-9104",
      date: "17 Oct 2026",
      status: "Entregado",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      items: "3x Garrafón 20L (Llenado)",
      address: "Calle Mina #402, Col. Centro",
      total: "$120.00 MXN",
    },
    {
      id: "ORD-8812",
      date: "09 Oct 2026",
      status: "Cancelado",
      statusColor: "bg-rose-100 text-rose-800 border-rose-200",
      items: "1x Garrafón 20L (Llenado)",
      address: "Av. Universidad #105, Col. Magisterial",
      total: "$40.00 MXN",
    },
  ];

  return (
    <div className="space-y-5">
      <header className="py-2">
        <h1 className="text-xl font-bold text-slate-900">Mis Pedidos</h1>
        <p className="text-xs text-slate-500">Historial de garrafones solicitados</p>
      </header>

      {/* Active Order Banner (Optional Callout) */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-100">Pedido en curso</span>
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            En Ruta 🚚
          </span>
        </div>
        <div>
          <p className="font-bold text-lg">2 Garrafones 20L</p>
          <p className="text-xs text-sky-100">Llega en aprox. 20 - 40 min</p>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">Pedidos Anteriores</h2>

        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
              <div>
                <span className="text-xs text-slate-400 font-mono">{order.id}</span>
                <p className="text-xs font-medium text-slate-500">{order.date}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-800 text-sm">{order.items}</p>
              <p className="text-slate-500">📍 {order.address}</p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="font-extrabold text-slate-900 text-base">{order.total}</span>
              <button className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition">
                🔁 Reordenar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
