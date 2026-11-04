'use client';

import { useState } from 'react';
import DashboardHeader from '@/components/admin/DashboardHeader';
import DeliveryRoutesTable from '@/components/admin/DeliveryRoutesTable';
import DeliveryRouteRow from '@/components/admin/DeliveryRouteRow';

export default function AdminDashboard() {
  const [routes, setRoutes] = useState([
    {
      id: 'RUT-001',
      customer: 'Juan Pérez',
      address: 'Calle Mina #402, Col. Centro',
      reference: 'Fachada azul, portón gris',
      quantity: 3,
      status: 'En Ruta',
    },
    {
      id: 'RUT-002',
      customer: 'María Fernández',
      address: 'Calle Paseo Tabasco #812, Col. Lindavista',
      reference: 'Edificio 3B, timbrar al 302',
      quantity: 2,
      status: 'En Ruta',
    },
    {
      id: 'RUT-003',
      customer: 'Carlos Mendoza',
      address: 'Av. Universidad #105, Col. Magisterial',
      reference: 'Junto a la papelería, cortina metálica',
      quantity: 1,
      status: 'En Ruta',
    },
  ]);

  const handleMarkDelivered = (routeId) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === routeId ? { ...r, status: 'Entregado' } : r))
    );
  };

  const pendingCount = routes.filter((r) => r.status !== 'Entregado').length;

  return (
    <div className="space-y-6">
      <DashboardHeader pendingCount={pendingCount} />

      {/* Orders & Addresses List */}
      <DeliveryRoutesTable>
        {routes.map((route) => (
          <DeliveryRouteRow
            key={route.id}
            route={route}
            onMarkDelivered={handleMarkDelivered}
          />
        ))}
      </DeliveryRoutesTable>
    </div>
  );
}
