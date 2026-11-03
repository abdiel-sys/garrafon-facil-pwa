'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  const linkClass = (path) => `block px-4 py-2.5 rounded-lg transition font-medium ${isActive(path)
      ? 'bg-slate-800 text-white shadow-sm'
      : 'hover:bg-slate-800/60 text-slate-400 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="text-xl font-bold text-sky-400 mb-8">Admin Purificadora</h2>
          <nav className="space-y-2 text-sm">
            <Link href="/admin/dashboard" className={linkClass('/admin/dashboard')}>
              🚚 Rutas y Pedidos
            </Link>
            <Link href="/admin/customers" className={linkClass('/admin/customers')}>
              👥 Clientes y Direcciones
            </Link>
            <Link href="/admin/inventory" className={linkClass('/admin/inventory')}>
              📦 Inventario
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
