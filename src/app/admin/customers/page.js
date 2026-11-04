'use client';

import { useState } from 'react';
import CustomersHeader from '@/components/admin/CustomersHeader';
import CustomerCard from '@/components/admin/CustomerCard';

export default function AdminCustomersPage() {
  const [customers] = useState([
    {
      id: "USR-001",
      name: "Carlos Mendoza",
      phone: "993 123 4567",
      totalOrders: 18,
      addresses: [
        {
          label: "Casa",
          street: "Calle Mina #402, Col. Centro",
          cp: "86000",
          reference: "Fachada azul, portón gris",
        },
        {
          label: "Negocio",
          street: "Av. Universidad #105, Col. Magisterial",
          cp: "86040",
          reference: "Junto a la papelería, cortina metálica",
        },
      ],
    },
    {
      id: "USR-002",
      name: "María Fernández",
      phone: "993 987 6543",
      totalOrders: 6,
      addresses: [
        {
          label: "Casa",
          street: "Calle Paseo Tabasco #812, Col. Lindavista",
          cp: "86050",
          reference: "Edificio de departamentos 3B, timbrar al 302",
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter((user) => {
    const q = searchQuery.toLowerCase();
    const matchesName = user.name.toLowerCase().includes(q);
    const matchesPhone = user.phone.includes(q);
    const matchesAddress = user.addresses.some(
      (a) => a.street.toLowerCase().includes(q) || a.reference.toLowerCase().includes(q)
    );
    return matchesName || matchesPhone || matchesAddress;
  });

  return (
    <div className="space-y-6">
      <CustomersHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCustomers.map((user) => (
          <CustomerCard key={user.id} customer={user} />
        ))}
      </div>
    </div>
  );
}
