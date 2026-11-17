export default function ActiveOrderBanner({ activeOrder }) {
  const items = activeOrder?.items_summary || '2 Garrafones 20L';
  const status = activeOrder?.status || 'En Ruta';

  return (
    <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-100">
          Pedido en curso
        </span>
        <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          {status} 🚚
        </span>
      </div>
      <div>
        <p className="font-bold text-lg">{items}</p>
        <p className="text-xs text-sky-100">Llega en aprox. 20 - 40 min</p>
      </div>
    </div>
  );
}
