'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Get current inventory metrics directly from database
 */
export async function getInventory() {
  const supabase = await createClient();

  let { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', 1)
    .maybeSingle();

  if (!data && !error) {
    // If table has no record yet, initialize it
    const { data: newRow, error: insertErr } = await supabase
      .from('inventory')
      .insert([{ id: 1, full_bottles: 0, empty_bottles: 0 }])
      .select()
      .single();

    if (!insertErr && newRow) {
      data = newRow;
    }
  }

  if (error && !data) {
    return {
      data: { full_bottles: 0, empty_bottles: 0 },
      error: error.message,
    };
  }

  return {
    data: {
      full_bottles: data?.full_bottles ?? 0,
      empty_bottles: data?.empty_bottles ?? 0,
    },
    error: null,
  };
}

/**
 * Add stock: refills empty containers into full bottles or registers newly acquired bottles
 */
export async function addStock(quantity, notes = 'Llenado y purificación de stock') {
  const supabase = await createClient();
  const qty = Number(quantity);

  if (isNaN(qty) || qty <= 0) {
    return { error: 'Cantidad inválida para agregar' };
  }

  const { data: inv, error: fetchErr } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', 1)
    .single();

  if (fetchErr || !inv) {
    return { error: 'Error al consultar inventario en la base de datos' };
  }

  // Refill bottles: decrement empty (up to available) and increment full
  const emptyToDeduct = Math.min(inv.empty_bottles, qty);
  const updatedFull = inv.full_bottles + qty;
  const updatedEmpty = Math.max(0, inv.empty_bottles - emptyToDeduct);

  const { data, error } = await supabase
    .from('inventory')
    .update({
      full_bottles: updatedFull,
      empty_bottles: updatedEmpty,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Register log
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from('inventory_logs').insert([
    {
      admin_id: user?.id || null,
      change_type: 'add_stock',
      quantity: qty,
      notes: notes || 'Stock añadido',
    },
  ]);

  revalidatePath('/admin/inventory');
  return { data, error: null };
}

/**
 * Remove stock or record merma / damaged containers
 */
export async function removeStock(quantity, reason = 'Merma / envase dañado') {
  const supabase = await createClient();
  const qty = Number(quantity);

  if (isNaN(qty) || qty <= 0) {
    return { error: 'Cantidad inválida para remover' };
  }

  const { data: inv, error: fetchErr } = await supabase
    .from('inventory')
    .select('*')
    .eq('id', 1)
    .single();

  if (fetchErr || !inv) {
    return { error: 'Error al consultar inventario en la base de datos' };
  }

  const updatedFull = Math.max(0, inv.full_bottles - qty);

  const { data, error } = await supabase
    .from('inventory')
    .update({
      full_bottles: updatedFull,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Register log
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from('inventory_logs').insert([
    {
      admin_id: user?.id || null,
      change_type: 'merma',
      quantity: qty,
      notes: reason || 'Merma de inventario',
    },
  ]);

  revalidatePath('/admin/inventory');
  return { data, error: null };
}
