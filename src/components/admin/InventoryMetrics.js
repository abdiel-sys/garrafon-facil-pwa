export default function InventoryMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Metric Cards */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase">Garrafones Llenos</span>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">145</p>
      </div>
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span className="text-xs font-semibold text-slate-400 uppercase">Envases Vacíos</span>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">32</p>
      </div>
    </div>
  );
}

