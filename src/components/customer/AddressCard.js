export default function AddressCard({ address, onEdit, onDelete }) {
  return (
    <div
      className={`bg-white p-4 rounded-2xl border ${
        address.isDefault ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-200'
      } shadow-sm space-y-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">{address.alias}</span>
          {address.isDefault && (
            <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Principal
            </span>
          )}
        </div>
        <div className="flex gap-2 text-xs font-semibold text-slate-400">
          <button
            type="button"
            onClick={() => onEdit?.(address.id)}
            className="hover:text-sky-600 transition"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(address.id)}
            className="hover:text-rose-600 transition"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="text-xs text-slate-600 space-y-0.5">
        <p className="font-semibold text-slate-800">
          {address.street}, {address.colonia}
        </p>
        <p className="text-slate-500">C.P. {address.cp}</p>
        <p className="text-slate-500 italic pt-1">📍 Ref: {address.reference}</p>
      </div>
    </div>
  );
}

