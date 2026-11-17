'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const UNIT_PRICE = 40.0;

/**
 * Place a new water order
 */
export async function createOrder({
  addressId = null,
  customAddress = null,
  quantity = 1,
  reference = '',
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Debes iniciar sesión para realizar un pedido' };
  }

  if (quantity < 1) {
    return { error: 'La cantidad mínima es 1 garrafón' };
  }

  let formattedAddress = '';
  let finalReference = reference || '';

  if (addressId) {
    const { data: addr } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single();

    if (addr) {
      formattedAddress = `${addr.street}, ${addr.colonia} (C.P. ${addr.cp})`;
      finalReference = finalReference || addr.reference || '';
    }
  }

  if (!formattedAddress && customAddress) {
    formattedAddress = `${customAddress.street || ''}, ${customAddress.colonia || ''} (C.P. ${customAddress.cp || ''})`;
    finalReference = finalReference || customAddress.reference || '';
  }

  if (!formattedAddress.trim()) {
    return { error: 'Se requiere una dirección de entrega válida' };
  }

  const total = quantity * UNIT_PRICE;
  const itemsSummary = `${quantity}x Garrafón 20L (Llenado)`;

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: user.id,
        address_id: addressId,
        delivery_address: formattedAddress,
        reference: finalReference,
        items_summary: itemsSummary,
        quantity,
        unit_price: UNIT_PRICE,
        total,
        status: 'Pendiente',
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/history');
  revalidatePath('/admin/dashboard');
  return { data, error: null };
}

/**
 * Get all past orders for the authenticated customer
 */
export async function getCustomerOrders() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: 'No autenticado' };
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

/**
 * Get active order (Pendiente or En Ruta) for current customer
 */
export async function getActiveCustomerOrder() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { data: null };

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['Pendiente', 'En Ruta'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return { data: null };
  return { data };
}

/**
 * Reorder a previous order
 */
export async function reorder(previousOrderId) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  const { data: prevOrder, error: fetchErr } = await supabase
    .from('orders')
    .select('*')
    .eq('id', previousOrderId)
    .eq('user_id', user.id)
    .single();

  if (fetchErr || !prevOrder) {
    return { error: 'Pedido anterior no encontrado' };
  }

  const total = prevOrder.quantity * UNIT_PRICE;

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: user.id,
        address_id: prevOrder.address_id,
        delivery_address: prevOrder.delivery_address,
        reference: prevOrder.reference,
        items_summary: prevOrder.items_summary,
        quantity: prevOrder.quantity,
        unit_price: UNIT_PRICE,
        total,
        status: 'Pendiente',
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/history');
  revalidatePath('/admin/dashboard');
  return { data, error: null };
}
