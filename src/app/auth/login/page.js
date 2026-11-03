"use client"
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-4xl">💧</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Purificadora de Agua
          </h1>
          <p className="text-xs text-slate-500">
            Inicia sesión para pedir tus garrafones a domicilio
          </p>
        </div>

        {/* Login Form Card */}
        <div className="mt-8 bg-white py-8 px-4 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Correo electrónico o Teléfono
              </label>
              <input
                type="text"
                required
                placeholder="Ej. 9931234567 o tu correo"
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
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition text-sm mt-2"
            >
              Iniciar Sesión
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
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-xs"
          >
            Continuar como Invitado
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-500">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-sky-600 font-bold hover:underline">
              Regístrate aquí
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
