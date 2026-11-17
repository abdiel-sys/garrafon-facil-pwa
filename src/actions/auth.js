'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function formatAuthError(error) {
  if (!error) return 'Error desconocido';
  const msg = error.message || String(error);

  if (msg.includes('Invalid login credentials')) {
    return 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus datos.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Tu correo no ha sido confirmado. Revisa tu bandeja de entrada o desactiva la confirmación en Supabase.';
  }
  if (msg.includes('User already registered')) {
    return 'Ya existe una cuenta registrada con este correo electrónico.';
  }
  if (msg.includes('Password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (msg.includes('rate limit') || msg.includes('Too many requests')) {
    return 'Demasiados intentos fallidos. Por favor, espera un momento antes de volver a intentar.';
  }
  return msg;
}

/**
 * Log in with email and password
 */
export async function login({ email, password }) {
  if (!email || !password) {
    return { error: 'Por favor, ingresa tu correo y contraseña.' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { error: formatAuthError(error) };
  }

  if (!data?.user) {
    return { error: 'No se pudo iniciar sesión. Usuario no encontrado.' };
  }

  // Get user profile to determine role-based redirect
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single();

  const role = profile?.role || 'customer';
  const targetPath = role === 'admin' ? '/admin/dashboard' : '/customer/order';

  revalidatePath('/', 'layout');
  return { success: true, redirectUrl: targetPath };
}

/**
 * Register a new user
 */
export async function signup({ email, password, fullName, phone, role = 'customer' }) {
  if (!email || !password) {
    return { error: 'Por favor, completa todos los campos requeridos.' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        role,
      },
    },
  });

  if (error) {
    return { error: formatAuthError(error) };
  }

  revalidatePath('/', 'layout');
  const targetPath = role === 'admin' ? '/admin/dashboard' : '/customer/order';
  return { success: true, redirectUrl: targetPath, user: data.user };
}

/**
 * Log out current user
 */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/auth/login');
}

/**
 * Get current authenticated user and profile
 */
export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile };
}
