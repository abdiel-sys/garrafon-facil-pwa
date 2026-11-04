export default function InventoryUpdateForm() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="font-semibold text-slate-800">Actualizar Inventario</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Cantidad de garrafones</label>
          <input
            type="number"
            placeholder="0"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow">
            + Agregar Stock
          </button>
          <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg shadow">
            - Remover / Merma
          </button>
        </div>
      </div>
    </div>
  );
}

