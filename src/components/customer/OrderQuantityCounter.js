'use client';

export default function OrderQuantityCounter({
  quantity = 1,
  onIncrement,
  onDecrement,
  pricePerUnit = 40,
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <h2 className="font-semibold text-slate-800">Garrafón 20L</h2>
        <p className="text-sm text-sky-600 font-bold">${pricePerUnit.toFixed(2)} MXN / c/u</p>
      </div>
      <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl">
        <button
          type="button"
          onClick={onDecrement}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-lg bg-white text-slate-700 font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
        >
          -
        </button>
        <span className="font-bold text-slate-800 min-w-4 text-center">{quantity}</span>
        <button
          type="button"
          onClick={onIncrement}
          className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold shadow-sm hover:bg-sky-700 transition"
        >
          +
        </button>
      </div>
    </div>
  );
}
