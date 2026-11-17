'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/admin/DashboardHeader';
import DeliveryRoutesTable from '@/components/admin/DeliveryRoutesTable';
import DeliveryRouteRow from '@/components/admin/DeliveryRouteRow';
import { getDeliveryRoutes, updateOrderStatus } from '@/actions/admin-dashboard';

export default function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getDeliveryRoutes().then((res) => {
      if (!ignore) {
        setIsLoading(false);
        if (res?.data) {
          setRoutes(res.data);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleMarkDelivered = async (routeId) => {
    const res = await updateOrderStatus(routeId, 'Entregado');
    if (!res?.error) {
      setRoutes((prev) =>
        prev.map((r) => (r.id === routeId ? { ...r, status: 'Entregado' } : r))
      );
    } else {
      alert(res.error);
    }
  };

  const pendingCount = routes.filter(
    (r) => r.status !== 'Entregado' && r.status !== 'Cancelado'
  ).length;

  return (
    <div className="space-y-6">
      <DashboardHeader pendingCount={pendingCount} />

      {/* Orders & Addresses List */}
      <DeliveryRoutesTable>
        {isLoading ? (
          <tr>
            <td colSpan={5} className="text-center py-10 text-slate-400 text-xs">
              Cargando rutas y pedidos desde la base de datos...
            </td>
          </tr>
        ) : routes.length > 0 ? (
          routes.map((route) => (
            <DeliveryRouteRow
              key={route.id}
              route={route}
              onMarkDelivered={handleMarkDelivered}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center py-12 text-slate-500 text-xs">
              <span className="text-2xl block mb-1">🚚</span>
              No hay pedidos registrados en la base de datos todavía.
            </td>
          </tr>
        )}
      </DeliveryRoutesTable>
    </div>
  );
}
