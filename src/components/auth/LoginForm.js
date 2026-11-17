'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm({ onLogin, onGuestLogin, isLoading = false, errorMessage = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
      {errorMessage && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl flex items-start gap-2.5">
          <span className="text-base leading-none">⚠️</span>
          <div className="flex-1 font-semibold leading-relaxed">
            {errorMessage}
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu-correo@ejemplo.com"
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-medium text-slate-700">
              Contraseña
            </label>
            <a href="#" className="text-xs text-sky-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition text-sm mt-2 disabled:opacity-50"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-400">O continúa con</span>
        </div>
      </div>

      {/* Guest or Quick Action */}
      <button
        type="button"
        onClick={onGuestLogin}
        className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-xs"
      >
        Continuar como Invitado
      </button>

      {/* Register Link */}
      <div className="mt-6 text-center text-xs text-slate-500">
        ¿No tienes una cuenta?{' '}
        <Link href="/auth/register" className="text-sky-600 font-bold hover:underline">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
