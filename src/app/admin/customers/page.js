'use client';

import { useState, useEffect } from 'react';
import CustomersHeader from '@/components/admin/CustomersHeader';
import CustomerCard from '@/components/admin/CustomerCard';
import { getAdminCustomers } from '@/actions/admin-customers';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getAdminCustomers().then((res) => {
      if (!ignore) {
        setIsLoading(false);
        if (res?.data) {
          setCustomers(res.data);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    getAdminCustomers(val).then((res) => {
      if (res?.data) {
        setCustomers(res.data);
      }
    });
  };

  const filteredCustomers = customers.filter((user) => {
    const q = searchQuery.toLowerCase();
    const matchesName = user.name?.toLowerCase().includes(q);
    const matchesPhone = user.phone?.includes(q);
    const matchesAddress = user.addresses?.some(
      (a) => a.street?.toLowerCase().includes(q) || a.reference?.toLowerCase().includes(q)
    );
    return matchesName || matchesPhone || matchesAddress;
  });

  return (
    <div className="space-y-6">
      <CustomersHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-xs text-slate-400">
            Cargando directorio de clientes desde la base de datos...
          </div>
        ) : filteredCustomers.length > 0 ? (
          filteredCustomers.map((user) => (
            <CustomerCard key={user.id} customer={user} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-6 space-y-2 text-xs text-slate-500">
            <span className="text-3xl block mb-1">👥</span>
            <p className="font-bold text-slate-700 text-sm">No se encontraron clientes</p>
            <p className="text-slate-400">
              {searchQuery
                ? 'No hay resultados que coincidan con la búsqueda.'
                : 'Aún no hay clientes registrados en la base de datos.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
