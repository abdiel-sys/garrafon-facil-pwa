export default function CustomerCard({ customer }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex justify-between items-start border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{customer.name}</h2>
          <p className="text-xs text-slate-500">
            📞 {customer.phone} • ID: <span className="font-mono">{customer.id}</span>
          </p>
        </div>
        <span className="bg-sky-50 text-sky-700 font-bold text-xs px-3 py-1 rounded-full border border-sky-100">
          {customer.totalOrders} Pedidos Realizados
        </span>
      </div>

      {/* Address List */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Direcciones Guardadas ({customer.addresses.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {customer.addresses.map((addr, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>📍 {addr.label}</span>
                <span className="font-normal text-slate-400">C.P. {addr.cp}</span>
              </div>
              <p className="text-slate-700 font-medium">{addr.street}</p>
              <p className="text-slate-500 italic">Ref: &quot;{addr.reference}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

