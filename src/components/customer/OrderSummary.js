export default function OrderSummary({ total = 80, onConfirm }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-2 text-slate-700 font-medium">
        <span>Total a pagar:</span>
        <span className="text-xl font-extrabold text-slate-900">${total.toFixed(2)} MXN</span>
      </div>
      <button
        type="button"
        onClick={onConfirm}
        className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
