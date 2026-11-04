import CustomerBottomNav from '@/components/customer/CustomerBottomNav';

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 max-w-md mx-auto border-x border-slate-200 flex flex-col justify-between">
      <main className="p-4">{children}</main>
      <CustomerBottomNav />
    </div>
  );
}
