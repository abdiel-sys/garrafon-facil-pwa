import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Gets the current authenticated user and their profile.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile };
}

/**
 * Ensures a user is logged in, otherwise redirects to login.
 */
export async function requireUser() {
  const { user, profile } = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return { user, profile };
}

/**
 * Ensures an admin is logged in, otherwise redirects to customer order.
 */
export async function requireAdmin() {
  const { user, profile } = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  if (profile?.role !== 'admin') {
    redirect('/customer/order');
  }

  return { user, profile };
}
