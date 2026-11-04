'use client';

import { useState } from 'react';
import HistoryHeader from '@/components/customer/HistoryHeader';
import ActiveOrderBanner from '@/components/customer/ActiveOrderBanner';
import OrderHistoryCard from '@/components/customer/OrderHistoryCard';

export default function HistoryPage() {
  const [orders] = useState([
    {
      id: "ORD-9482",
      date: "24 Oct 2026",
      status: "Entregado",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      items: "2x Garrafón 20L (Llenado)",
      address: "Calle Mina #402, Col. Centro",
      total: "$80.00 MXN",
    },
    {
      id: "ORD-9104",
      date: "17 Oct 2026",
      status: "Entregado",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      items: "3x Garrafón 20L (Llenado)",
      address: "Calle Mina #402, Col. Centro",
      total: "$120.00 MXN",
    },
    {
      id: "ORD-8812",
      date: "09 Oct 2026",
      status: "Cancelado",
      statusColor: "bg-rose-100 text-rose-800 border-rose-200",
      items: "1x Garrafón 20L (Llenado)",
      address: "Av. Universidad #105, Col. Magisterial",
      total: "$40.00 MXN",
    },
  ]);

  const handleReorder = (orderId) => {
    alert(`Reordenando pedido: ${orderId}`);
  };

  return (
    <div className="space-y-5">
      <HistoryHeader />
      <ActiveOrderBanner />

      {/* History List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">Pedidos Anteriores</h2>
        {orders.map((order) => (
          <OrderHistoryCard
            key={order.id}
            order={order}
            onReorder={handleReorder}
          />
        ))}
      </div>
    </div>
  );
}
