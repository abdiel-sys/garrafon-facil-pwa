'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BrandHeader from '@/components/auth/BrandHeader';
import LoginForm from '@/components/auth/LoginForm';
import { login } from '@/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await login({ email, password });
      if (res?.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
        return;
      }

      const destination = redirectTo || res.redirectUrl || '/customer/order';
      router.push(destination);
      router.refresh();
    } catch {
      setErrorMessage('Ocurrió un error inesperado al iniciar sesión.');
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    router.push('/customer/order');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <BrandHeader />
        <LoginForm
          onLogin={handleLogin}
          onGuestLogin={handleGuestLogin}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
