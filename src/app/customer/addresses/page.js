export default function CustomerAddressesPage() {
  const savedAddresses = [
    {
      id: 1,
      alias: "Mi Casa",
      street: "Calle Mina #402",
      colonia: "Col. Centro",
      cp: "86000",
      reference: "Portón color gris, fachada azul",
      isDefault: true,
    },
    {
      id: 2,
      alias: "Oficina / Trabajo",
      street: "Av. Universidad #105",
      colonia: "Col. Magisterial",
      cp: "86040",
      reference: "Recepción en planta baja",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-5">
      <header className="flex justify-between items-center py-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Mis Direcciones</h1>
          <p className="text-xs text-slate-500">Administra tus puntos de entrega</p>
        </div>
        <button className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow transition">
          + Nueva
        </button>
      </header>

      {/* Saved Addresses List */}
      <div className="space-y-3">
        {savedAddresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white p-4 rounded-2xl border ${addr.isDefault ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-200'} shadow-sm space-y-2`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{addr.alias}</span>
                {addr.isDefault && (
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Principal
                  </span>
                )}
              </div>
              <div className="flex gap-2 text-xs font-semibold text-slate-400">
                <button className="hover:text-sky-600">Editar</button>
                <button className="hover:text-rose-600">Eliminar</button>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-800">{addr.street}, {addr.colonia}</p>
              <p className="text-slate-500">C.P. {addr.cp}</p>
              <p className="text-slate-500 italic pt-1">📍 Ref: {addr.reference}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
