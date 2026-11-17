'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Fetch all customers, their saved addresses, and total order count for admin directory
 */
export async function getAdminCustomers(searchQuery = '') {
  const supabase = await createClient();

  let query = supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      phone,
      email,
      created_at,
      addresses (
        id,
        alias,
        street,
        colonia,
        cp,
        reference,
        is_default
      ),
      orders:orders(count)
    `)
    .eq('role', 'customer')
    .order('created_at', { ascending: false });

  if (searchQuery.trim()) {
    query = query.or(
      `full_name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    return { data: [], error: error.message };
  }

  // Format into convenient view objects
  const formattedCustomers = (data || []).map((user) => ({
    id: user.id.slice(0, 8).toUpperCase(),
    rawId: user.id,
    name: user.full_name || 'Sin Nombre',
    phone: user.phone || 'Sin Teléfono',
    email: user.email || '',
    totalOrders: user.orders?.[0]?.count || 0,
    addresses: (user.addresses || []).map((addr) => ({
      label: addr.alias || 'Dirección',
      street: addr.street,
      cp: addr.cp,
      reference: addr.reference || 'Sin referencias',
    })),
  }));

  return { data: formattedCustomers, error: null };
}

/**
 * Get detailed customer profile with complete history
 */
export async function getCustomerDetails(customerId) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      *,
      addresses (*),
      orders (*)
    `)
    .eq('id', customerId)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: profile, error: null };
}
