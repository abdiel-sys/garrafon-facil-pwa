export default function AddressesHeader() {
  return (
    <header className="flex justify-between items-center py-2">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Mis Direcciones</h1>
        <p className="text-xs text-slate-500">Administra tus puntos de entrega</p>
      </div>
      <button className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow transition">
        + Nueva
      </button>
    </header>
  );
}

