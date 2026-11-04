export default function ActiveOrderBanner() {
  return (
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
  );
}

