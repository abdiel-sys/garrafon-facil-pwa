export default function DashboardHeader({ pendingCount = 12 }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Rutas de Entrega</h1>
        <p className="text-sm text-slate-500">Pedidos activos para el día de hoy</p>
      </div>
      <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1.5 rounded-full">
        {pendingCount} Pedidos Pendientes
      </span>
    </div>
  );
}
