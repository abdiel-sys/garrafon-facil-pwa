export default function DeliveryRoutesTable({ children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Dirección &amp; Referencia</th>
            <th className="px-4 py-3">Cantidad</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}
