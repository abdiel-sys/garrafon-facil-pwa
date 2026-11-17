'use client';

import { useState, useEffect } from 'react';
import AddressesHeader from '@/components/customer/AddressesHeader';
import AddressCard from '@/components/customer/AddressCard';
import {
  getCustomerAddresses,
  createAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/actions/addresses';

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({
    alias: '',
    street: '',
    colonia: '',
    cp: '',
    reference: '',
    is_default: false,
  });

  useEffect(() => {
    let ignore = false;
    getCustomerAddresses().then((res) => {
      if (!ignore) {
        setIsLoading(false);
        if (res?.data) {
          setAddresses(res.data);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const refreshAddresses = () => {
    getCustomerAddresses().then((res) => {
      if (res?.data) {
        setAddresses(res.data);
      }
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await createAddress(newAddr);
    if (!res?.error) {
      setIsAdding(false);
      setNewAddr({ alias: '', street: '', colonia: '', cp: '', reference: '', is_default: false });
      refreshAddresses();
    } else {
      alert(res.error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Deseas eliminar esta dirección?')) {
      const res = await deleteAddress(id);
      if (!res?.error) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(res.error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    const res = await setDefaultAddress(id);
    if (!res?.error) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, is_default: a.id === id }))
      );
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="space-y-5">
      <AddressesHeader onNewClick={() => setIsAdding((prev) => !prev)} />

      {isAdding && (
        <form onSubmit={handleCreate} className="bg-white p-4 rounded-2xl border border-sky-300 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Agregar Nueva Dirección</h2>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Alias (Ej. Casa de playa)"
              value={newAddr.alias}
              onChange={(e) => setNewAddr({ ...newAddr, alias: e.target.value })}
              className="col-span-2 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              required
              placeholder="Calle y Número"
              value={newAddr.street}
              onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              required
              placeholder="Colonia"
              value={newAddr.colonia}
              onChange={(e) => setNewAddr({ ...newAddr, colonia: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              required
              placeholder="C.P."
              value={newAddr.cp}
              onChange={(e) => setNewAddr({ ...newAddr, cp: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Referencias (opcional)"
              value={newAddr.reference}
              onChange={(e) => setNewAddr({ ...newAddr, reference: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-slate-500 font-medium hover:text-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow transition"
            >
              Guardar Dirección
            </button>
          </div>
        </form>
      )}

      {/* Saved Addresses List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 text-xs text-slate-400">
            Cargando direcciones desde la base de datos...
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onSetDefault={() => handleSetDefault(addr.id)}
              onDelete={() => handleDelete(addr.id)}
            />
          ))
        ) : (
          !isAdding && (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 p-6 space-y-3">
              <span className="text-3xl">📍</span>
              <div>
                <p className="font-bold text-slate-800 text-sm">Sin direcciones guardadas</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Agrega tus puntos de entrega para pedir tus garrafones con un solo toque.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="inline-block px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                + Agregar mi primera dirección
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
