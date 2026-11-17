'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Get all addresses for the authenticated customer
 */
export async function getCustomerAddresses() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: 'No autenticado' };
  }

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

/**
 * Create a new address for the customer
 */
export async function createAddress(addressData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  // If new address is default, reset current defaults
  if (addressData.is_default) {
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
  }

  const { data, error } = await supabase
    .from('addresses')
    .insert([
      {
        user_id: user.id,
        alias: addressData.alias || 'Mi Dirección',
        street: addressData.street,
        colonia: addressData.colonia,
        cp: addressData.cp,
        reference: addressData.reference || '',
        is_default: Boolean(addressData.is_default),
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/addresses');
  revalidatePath('/customer/order');
  return { data, error: null };
}

/**
 * Update an existing address
 */
export async function updateAddress(addressId, addressData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  if (addressData.is_default) {
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
  }

  const { data, error } = await supabase
    .from('addresses')
    .update({
      alias: addressData.alias,
      street: addressData.street,
      colonia: addressData.colonia,
      cp: addressData.cp,
      reference: addressData.reference,
      is_default: addressData.is_default,
      updated_at: new Date().toISOString(),
    })
    .eq('id', addressId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/addresses');
  revalidatePath('/customer/order');
  return { data, error: null };
}

/**
 * Delete an address
 */
export async function deleteAddress(addressId) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/addresses');
  revalidatePath('/customer/order');
  return { success: true };
}

/**
 * Set an address as the default address
 */
export async function setDefaultAddress(addressId) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  // Remove default from all user addresses
  await supabase
    .from('addresses')
    .update({ is_default: false })
    .eq('user_id', user.id);

  // Set new default
  const { data, error } = await supabase
    .from('addresses')
    .update({ is_default: true, updated_at: new Date().toISOString() })
    .eq('id', addressId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/customer/addresses');
  revalidatePath('/customer/order');
  return { data, error: null };
}
