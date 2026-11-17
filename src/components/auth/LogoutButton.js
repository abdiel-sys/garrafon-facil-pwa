'use client';

import { useTransition } from 'react';
import { logout } from '@/actions/auth';

export default function LogoutButton({ className = '', variant = 'link' }) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-slate-800/80 rounded-lg transition disabled:opacity-50 ${className}`}
      >
        <span>🚪</span>
        <span>{isPending ? 'Cerrando sesión...' : 'Cerrar Sesión'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={`text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 disabled:opacity-50 ${className}`}
    >
      <span>🚪</span>
      <span>{isPending ? 'Saliendo...' : 'Cerrar Sesión'}</span>
    </button>
  );
}
