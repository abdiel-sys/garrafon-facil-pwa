import CustomerBottomNav from '@/components/customer/CustomerBottomNav';
import LogoutButton from '@/components/auth/LogoutButton';

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 max-w-md mx-auto border-x border-slate-200 flex flex-col justify-between">
      <div>
        <header className="px-4 py-3 bg-white border-b border-slate-200 flex justify-between items-center shadow-xs">
          <span className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
            <span className="text-base">💧</span> Garrafón Fácil
          </span>
          <LogoutButton />
        </header>
        <main className="p-4">{children}</main>
      </div>
      <CustomerBottomNav />
    </div>
  );
}
