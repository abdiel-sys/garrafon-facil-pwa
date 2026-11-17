'use client';

import { useState, useEffect } from 'react';
import InventoryMetrics from '@/components/admin/InventoryMetrics';
import InventoryUpdateForm from '@/components/admin/InventoryUpdateForm';
import { getInventory, addStock, removeStock } from '@/actions/admin-inventory';

export default function InventoryPage() {
  const [metrics, setMetrics] = useState({ full_bottles: 0, empty_bottles: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', isError: false });

  const loadInventory = async () => {
    const res = await getInventory();
    setIsLoading(false);
    if (res?.data) {
      setMetrics(res.data);
    }
  };

  useEffect(() => {
    let ignore = false;
    getInventory().then((res) => {
      if (!ignore) {
        setIsLoading(false);
        if (res?.data) {
          setMetrics(res.data);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddStock = async (qty) => {
    setMessage({ text: '', isError: false });
    const res = await addStock(qty);
    if (!res?.error) {
      setMessage({ text: `Se agregaron ${qty} garrafones al inventario.`, isError: false });
      loadInventory();
    } else {
      setMessage({ text: res.error, isError: true });
    }
  };

  const handleRemoveStock = async (qty) => {
    setMessage({ text: '', isError: false });
    const res = await removeStock(qty);
    if (!res?.error) {
      setMessage({ text: `Se registraron ${qty} garrafones como merma/salida.`, isError: false });
      loadInventory();
    } else {
      setMessage({ text: res.error, isError: true });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Control de Inventario</h1>

      {message.text && (
        <div
          className={`p-3 rounded-xl text-xs font-semibold ${
            message.isError
              ? 'bg-rose-50 border border-rose-200 text-rose-700'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
          Cargando inventario desde la base de datos...
        </div>
      ) : (
        <InventoryMetrics
          fullBottles={metrics.full_bottles}
          emptyBottles={metrics.empty_bottles}
        />
      )}

      <InventoryUpdateForm
        onAdd={handleAddStock}
        onRemove={handleRemoveStock}
      />
    </div>
  );
}
