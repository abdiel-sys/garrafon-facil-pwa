import BrandHeader from '@/components/auth/BrandHeader';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <BrandHeader />
        <LoginForm />
      </div>
    </div>
  );
}
