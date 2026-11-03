export default function OrderPage() {
  return (
    <div className="space-y-6">
      <header className="text-center py-2">
        <h1 className="text-xl font-bold text-slate-900">Purificadora de Agua</h1>
        <p className="text-sm text-slate-500">Pide tu garrafón de 20L a domicilio</p>
      </header>

      {/* Quantity Counter Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-slate-800">Garrafón 20L</h2>
          <p className="text-sm text-sky-600 font-bold">$40.00 MXN / c/u</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl">
          <button className="w-8 h-8 rounded-lg bg-white text-slate-700 font-bold shadow-sm">-</button>
          <span className="font-bold text-slate-800">2</span>
          <button className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold shadow-sm">+</button>
        </div>
      </div>

      {/* Delivery Address Form */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <h2 className="font-semibold text-slate-800 border-b pb-2">Dirección de Entrega</h2>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Calle y Número</label>
          <input
            type="text"
            placeholder="Ej. Av. Hidalgo #123"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Colonia</label>
            <input
              type="text"
              placeholder="Ej. Centro"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Código Postal</label>
            <input
              type="text"
              placeholder="86000"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Referencias de la casa</label>
          <textarea
            rows={2}
            placeholder="Ej. Portón color blanco, frente a la tiendita..."
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Order Summary & Submit Button */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2 text-slate-700 font-medium">
          <span>Total a pagar:</span>
          <span className="text-xl font-extrabold text-slate-900">$80.00 MXN</span>
        </div>
        <button className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition">
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
