'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HistoryHeader from '@/components/customer/HistoryHeader';
import ActiveOrderBanner from '@/components/customer/ActiveOrderBanner';
import OrderHistoryCard from '@/components/customer/OrderHistoryCard';
import { getCustomerOrders, getActiveCustomerOrder, reorder } from '@/actions/orders';

function getStatusColor(status) {
  switch (status) {
    case 'Entregado':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'En Ruta':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Cancelado':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-sky-100 text-sky-800 border-sky-200';
  }
}

export default function HistoryPage() {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatOrders = (rawList) =>
    (rawList || []).map((o) => ({
      id: o.id,
      date: new Date(o.created_at).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: o.status,
      statusColor: getStatusColor(o.status),
      items: o.items_summary,
      address: o.delivery_address,
      total: `$${Number(o.total).toFixed(2)} MXN`,
    }));

  useEffect(() => {
    let ignore = false;

    Promise.all([getCustomerOrders(), getActiveCustomerOrder()]).then(
      ([ordersRes, activeRes]) => {
        if (ignore) return;
        setIsLoading(false);

        if (ordersRes?.data) {
          setOrders(formatOrders(ordersRes.data));
        }

        if (activeRes?.data) {
          setActiveOrder(activeRes.data);
        }
      }
    );

    return () => {
      ignore = true;
    };
  }, []);

  const handleReorder = async (orderId) => {
    const res = await reorder(orderId);
    if (!res?.error) {
      alert('¡Pedido reordenado exitosamente!');
      const ordersRes = await getCustomerOrders();
      if (ordersRes?.data) {
        setOrders(formatOrders(ordersRes.data));
      }
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-5">
      <HistoryHeader />

      {/* Active Order Banner (shown only when an active order exists in database) */}
      {activeOrder && <ActiveOrderBanner activeOrder={activeOrder} />}

      {/* History List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">Pedidos Anteriores</h2>

        {isLoading ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
            Cargando historial desde la base de datos...
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <OrderHistoryCard
              key={order.id}
              order={order}
              onReorder={handleReorder}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6 space-y-3">
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-bold text-slate-800 text-sm">No tienes pedidos anteriores</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Tus pedidos de garrafones aparecerán aquí en cuanto los realices.
              </p>
            </div>
            <Link
              href="/customer/order"
              className="inline-block px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Hacer mi primer pedido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
