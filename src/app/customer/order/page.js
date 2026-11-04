'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrderHeader from '@/components/customer/OrderHeader';
import OrderQuantityCounter from '@/components/customer/OrderQuantityCounter';
import AddressOptionCard from '@/components/customer/AddressOptionCard';
import DeliveryAddressForm from '@/components/customer/DeliveryAddressForm';
import OrderSummary from '@/components/customer/OrderSummary';

export default function OrderPage() {
  const [quantity, setQuantity] = useState(2);
  const unitPrice = 40;

  // List of saved addresses managed in page.js
  const [savedAddresses] = useState([
    {
      id: 1,
      alias: 'Mi Casa',
      street: 'Calle Mina #402',
      colonia: 'Col. Centro',
      cp: '86000',
      reference: 'Portón color gris, fachada azul',
      isDefault: true,
    },
    {
      id: 2,
      alias: 'Oficina / Trabajo',
      street: 'Av. Universidad #105',
      colonia: 'Col. Magisterial',
      cp: '86040',
      reference: 'Recepción en planta baja',
      isDefault: false,
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    street: '',
    colonia: '',
    cp: '',
    reference: '',
  });

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSelectSaved = (id) => {
    setSelectedAddressId(id);
    setIsCustomAddress(false);
  };

  const handleSelectNew = () => {
    setIsCustomAddress(true);
  };

  const handleNewAddressChange = (name, value) => {
    setNewAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = () => {
    const chosenAddress = isCustomAddress
      ? `${newAddressForm.street || 'Nueva dirección'}, ${newAddressForm.colonia}`
      : savedAddresses.find((a) => a.id === selectedAddressId)?.street;

    alert(`¡Pedido confirmado! ${quantity} garrafón(es) para entregar en: ${chosenAddress}`);
  };

  const totalPrice = quantity * unitPrice;

  return (
    <div className="space-y-6">
      <OrderHeader />

      {/* Quantity Counter Card */}
      <OrderQuantityCounter
        quantity={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        pricePerUnit={unitPrice}
      />

      {/* Delivery Address Selection & Form */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-semibold text-slate-800">Dirección de Entrega</h2>
          <Link
            href="/customer/addresses"
            className="text-xs text-sky-600 font-semibold hover:underline"
          >
            Administrar
          </Link>
        </div>

        {/* Saved Addresses List Option */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">Selecciona una dirección guardada:</p>
          <div className="space-y-2">
            {savedAddresses.map((address) => (
              <AddressOptionCard
                key={address.id}
                address={address}
                isSelected={!isCustomAddress && selectedAddressId === address.id}
                onSelect={() => handleSelectSaved(address.id)}
              />
            ))}
          </div>
        </div>

        {/* Option to use a new address */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleSelectNew}
            className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition flex items-center justify-between ${
              isCustomAddress
                ? 'border-sky-500 bg-sky-50/50 text-sky-700'
                : 'border-dashed border-slate-300 text-slate-600 hover:border-slate-400 bg-slate-50/50'
            }`}
          >
            <span>+ Entregar en otra dirección</span>
            <span className="text-base">{isCustomAddress ? '✓' : ''}</span>
          </button>

          {isCustomAddress && (
            <DeliveryAddressForm
              formData={newAddressForm}
              onChange={handleNewAddressChange}
            />
          )}
        </div>
      </div>

      {/* Order Summary & Submit Button */}
      <OrderSummary total={totalPrice} onConfirm={handleConfirmOrder} />
    </div>
  );
}
