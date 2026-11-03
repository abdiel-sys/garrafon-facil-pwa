export default function AdminCustomersPage() {
  const customers = [
    {
      id: "USR-001",
      name: "Carlos Mendoza",
      phone: "993 123 4567",
      totalOrders: 18,
      addresses: [
        {
          label: "Casa",
          street: "Calle Mina #402, Col. Centro",
          cp: "86000",
          reference: "Fachada azul, portón gris",
        },
        {
          label: "Negocio",
          street: "Av. Universidad #105, Col. Magisterial",
          cp: "86040",
          reference: "Junto a la papelería, cortina metálica",
        },
      ],
    },
    {
      id: "USR-002",
      name: "María Fernández",
      phone: "993 987 6543",
      totalOrders: 6,
      addresses: [
        {
          label: "Casa",
          street: "Calle Paseo Tabasco #812, Col. Lindavista",
          cp: "86050",
          reference: "Edificio de departamentos 3B, timbrar al 302",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Directorio de Clientes</h1>
          <p className="text-sm text-slate-500">Consulta todos los clientes registrados y sus direcciones de entrega</p>
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o colonia..."
          className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 w-full sm:w-72 shadow-sm"
        />
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-4">
        {customers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">{user.name}</h2>
                <p className="text-xs text-slate-500">📞 {user.phone} • ID: <span className="font-mono">{user.id}</span></p>
              </div>
              <span className="bg-sky-50 text-sky-700 font-bold text-xs px-3 py-1 rounded-full border border-sky-100">
                {user.totalOrders} Pedidos Realizados
              </span>
            </div>

            {/* Address List */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direcciones Guardadas ({user.addresses.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {user.addresses.map((addr, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>📍 {addr.label}</span>
                      <span className="font-normal text-slate-400">C.P. {addr.cp}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{addr.street}</p>
                    <p className="text-slate-500 italic">Ref: "{addr.reference}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
