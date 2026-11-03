export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rutas de Entrega</h1>
          <p className="text-sm text-slate-500">Pedidos activos para el día de hoy</p>
        </div>
        <span className="bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1.5 rounded-full">
          12 Pedidos Pendientes
        </span>
      </div>

      {/* Orders & Addresses List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Dirección & Referencia</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3 font-semibold text-slate-900">Juan Pérez</td>
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">Calle Mina #402, Col. Centro</p>
                <p className="text-xs text-slate-400">Ref: Fachada azul, portón gris</p>
              </td>
              <td className="px-4 py-3 font-bold text-slate-800">3 Garrafones</td>
              <td className="px-4 py-3">
                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                  En Ruta
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow hover:bg-emerald-700">
                  Marcar Entregado
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
