import Link from 'next/link';

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 max-w-md mx-auto border-x border-slate-200 flex flex-col justify-between">
      <main className="p-4">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 max-w-md mx-auto px-6 py-3 flex justify-around text-xs font-semibold text-slate-600">
        <Link href="/customer/order" className="flex flex-col items-center text-sky-600">
          <span className="text-lg">💧</span>
          Pedir Agua
        </Link>
        <Link href="/customer/history" className="flex flex-col items-center hover:text-sky-600">
          <span className="text-lg">📋</span>
          Mis Pedidos
        </Link>
      </nav>
    </div>
  );
}
