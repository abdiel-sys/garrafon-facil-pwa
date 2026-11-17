'use client';

import { useState } from 'react';

export default function InventoryUpdateForm({ onAdd, onRemove }) {
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    const val = parseInt(amount, 10);
    if (!isNaN(val) && val > 0 && onAdd) {
      onAdd(val);
      setAmount('');
    }
  };

  const handleRemove = () => {
    const val = parseInt(amount, 10);
    if (!isNaN(val) && val > 0 && onRemove) {
      onRemove(val);
      setAmount('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="font-semibold text-slate-800">Actualizar Inventario</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Cantidad de garrafones</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow transition"
          >
            + Agregar Stock
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg shadow transition"
          >
            - Remover / Merma
          </button>
        </div>
      </div>
    </div>
  );
}
