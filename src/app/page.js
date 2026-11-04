import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-4 text-center">
        <h1 className="text-xl font-bold text-slate-800 mb-6">
          💧 Garrafón Fácil
        </h1>

        <div className="flex flex-col gap-3">
          <Link
            href="/customer/order"
            className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow transition text-center"
          >
            Customer
          </Link>

          <Link
            href="/admin/dashboard"
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow transition text-center"
          >
            Admin
          </Link>

          <Link
            href="/auth/login"
            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 shadow-sm transition text-center"
          >
            Auth
          </Link>
        </div>
      </div>
    </div>
  );
}
