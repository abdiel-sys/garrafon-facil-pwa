import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="text-xl font-bold text-sky-400 mb-8">Admin Purificadora</h2>
          <nav className="space-y-2 text-sm">
            <Link href="/admin/dashboard" className="block px-4 py-2.5 rounded-lg bg-slate-800 text-white font-medium">
              🚚 Rutas y Pedidos
            </Link>
            <Link href="/admin/inventory" className="block px-4 py-2.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
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
