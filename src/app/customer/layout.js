'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomerLayout({ children }) {
  const pathname = usePathname();

  // Helper function to check active state
  const isActive = (path) => pathname === path;

  const navClass = (path) => `flex flex-col items-center transition ${isActive(path)
      ? 'text-sky-600 font-bold'
      : 'text-slate-500 hover:text-sky-600 font-semibold'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 max-w-md mx-auto border-x border-slate-200 flex flex-col justify-between">
      <main className="p-4">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 max-w-md mx-auto px-6 py-3 flex justify-around text-xs">
        <Link href="/customer/order" className={navClass('/customer/order')}>
          <span className="text-lg">💧</span>
          Pedir Agua
        </Link>
        <Link href="/customer/addresses" className={navClass('/customer/addresses')}>
          <span className="text-lg">📍</span>
          Direcciones
        </Link>
        <Link href="/customer/history" className={navClass('/customer/history')}>
          <span className="text-lg">📋</span>
          Mis Pedidos
        </Link>
      </nav>
    </div>
  );
}
