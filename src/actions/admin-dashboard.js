'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Fetch delivery routes / orders for the admin dashboard
 */
export async function getDeliveryRoutes(statusFilter = null) {
  const supabase = await createClient();

  let query = supabase
    .from('orders')
    .select(`
      id,
      delivery_address,
      reference,
      items_summary,
      quantity,
      total,
      status,
      created_at,
      profiles:user_id (
        id,
        full_name,
        phone
      )
    `)
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    return { data: [], error: error.message };
  }

  // Format into convenient structure for Dashboard view
  const formattedRoutes = (data || []).map((order) => ({
    id: order.id,
    customer: order.profiles?.full_name || 'Cliente',
    phone: order.profiles?.phone || '',
    address: order.delivery_address,
    reference: order.reference || 'Sin referencias',
    quantity: order.quantity,
    total: `$${Number(order.total).toFixed(2)} MXN`,
    status: order.status,
    createdAt: order.created_at,
  }));

  return { data: formattedRoutes, error: null };
}

/**
 * Update order delivery status (e.g., 'En Ruta', 'Entregado', 'Cancelado')
 */
export async function updateOrderStatus(orderId, newStatus) {
  const supabase = await createClient();

  // Validate admin permissions via RLS or session
  const { data: order, error } = await supabase
    .from('orders')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // If order was delivered, decrement full bottles and increment empty bottles in inventory
  if (newStatus === 'Entregado' && order) {
    const { data: inv } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', 1)
      .single();

    if (inv) {
      const updatedFull = Math.max(0, inv.full_bottles - order.quantity);
      const updatedEmpty = inv.empty_bottles + order.quantity;

      await supabase
        .from('inventory')
        .update({
          full_bottles: updatedFull,
          empty_bottles: updatedEmpty,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1);
    }
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/admin/inventory');
  revalidatePath('/customer/history');
  return { data: order, error: null };
}

/**
 * Get count of pending / active orders
 */
export async function getPendingOrdersCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .in('status', ['Pendiente', 'En Ruta']);

  if (error) return { count: 0 };
  return { count: count || 0 };
}
