'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandHeader from '@/components/auth/BrandHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import { signup } from '@/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async ({ email, password, fullName, phone }) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await signup({
        email,
        password,
        fullName,
        phone,
        role: 'customer',
      });

      if (res?.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
        return;
      }

      router.push(res.redirectUrl || '/customer/order');
      router.refresh();
    } catch {
      setErrorMessage('Ocurrió un error al registrar la cuenta.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <BrandHeader />
        <RegisterForm
          onRegister={handleRegister}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
