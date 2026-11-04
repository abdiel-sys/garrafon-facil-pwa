export default function OrderHistoryCard({ order, onReorder }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
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
        <button
          type="button"
          onClick={() => onReorder?.(order.id)}
          className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl transition"
        >
          🔁 Reordenar
        </button>
      </div>
    </div>
  );
}

