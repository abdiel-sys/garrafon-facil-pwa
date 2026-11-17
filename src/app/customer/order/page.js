'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OrderHeader from '@/components/customer/OrderHeader';
import OrderQuantityCounter from '@/components/customer/OrderQuantityCounter';
import AddressOptionCard from '@/components/customer/AddressOptionCard';
import DeliveryAddressForm from '@/components/customer/DeliveryAddressForm';
import OrderSummary from '@/components/customer/OrderSummary';
import { getCustomerAddresses } from '@/actions/addresses';
import { createOrder } from '@/actions/orders';

export default function OrderPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(2);
  const unitPrice = 40;

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isCustomAddress, setIsCustomAddress] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const [newAddressForm, setNewAddressForm] = useState({
    street: '',
    colonia: '',
    cp: '',
    reference: '',
  });

  useEffect(() => {
    let ignore = false;
    getCustomerAddresses().then((res) => {
      if (!ignore) {
        setIsLoadingAddresses(false);
        if (res?.data && res.data.length > 0) {
          setSavedAddresses(res.data);
          const defaultAddr = res.data.find((a) => a.is_default) || res.data[0];
          setSelectedAddressId(defaultAddr.id);
          setIsCustomAddress(false);
        } else {
          setSavedAddresses([]);
          setIsCustomAddress(true);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

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

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    const payload = {
      quantity,
      addressId: isCustomAddress ? null : selectedAddressId,
      customAddress: isCustomAddress ? newAddressForm : null,
      reference: isCustomAddress ? newAddressForm.reference : '',
    };

    const res = await createOrder(payload);

    if (res?.error) {
      setStatusMessage({ type: 'error', text: res.error });
      setIsSubmitting(false);
      return;
    }

    setStatusMessage({
      type: 'success',
      text: '¡Pedido registrado con éxito! Redirigiendo a tus pedidos...',
    });

    setTimeout(() => {
      router.push('/customer/history');
    }, 1200);
  };

  const totalPrice = quantity * unitPrice;

  return (
    <div className="space-y-6">
      <OrderHeader />

      {statusMessage.text && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold ${
            statusMessage.type === 'error'
              ? 'bg-rose-50 border border-rose-300 text-rose-800'
              : 'bg-emerald-50 border border-emerald-300 text-emerald-800'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

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

        {isLoadingAddresses ? (
          <p className="text-xs text-slate-400 py-3 text-center">Cargando direcciones...</p>
        ) : savedAddresses.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              No tienes direcciones guardadas. Ingresa tu dirección de entrega:
            </p>
            <DeliveryAddressForm
              formData={newAddressForm}
              onChange={handleNewAddressChange}
            />
          </div>
        )}
      </div>

      {/* Order Summary & Submit Button */}
      <OrderSummary
        total={totalPrice}
        onConfirm={handleConfirmOrder}
        disabled={isSubmitting}
      />
    </div>
  );
}
