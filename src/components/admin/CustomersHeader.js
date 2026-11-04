export default function CustomersHeader({ searchQuery = '', onSearchChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Directorio de Clientes</h1>
        <p className="text-sm text-slate-500">
          Consulta todos los clientes registrados y sus direcciones de entrega
        </p>
      </div>

      {/* Search input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder="Buscar por nombre, teléfono o colonia..."
        className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 w-full sm:w-72 shadow-sm"
      />
    </div>
  );
}
