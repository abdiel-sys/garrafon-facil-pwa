'use client';

import { useState } from 'react';
import AddressesHeader from '@/components/customer/AddressesHeader';
import AddressCard from '@/components/customer/AddressCard';

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      alias: "Mi Casa",
      street: "Calle Mina #402",
      colonia: "Col. Centro",
      cp: "86000",
      reference: "Portón color gris, fachada azul",
      isDefault: true,
    },
    {
      id: 2,
      alias: "Oficina / Trabajo",
      street: "Av. Universidad #105",
      colonia: "Col. Magisterial",
      cp: "86040",
      reference: "Recepción en planta baja",
      isDefault: false,
    },
  ]);

  const handleEdit = (id) => {
    alert(`Editar dirección con ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm('¿Deseas eliminar esta dirección?')) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-5">
      <AddressesHeader />

      {/* Saved Addresses List */}
      <div className="space-y-3">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
