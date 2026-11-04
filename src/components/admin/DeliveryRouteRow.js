export default function DeliveryRouteRow({ route, onMarkDelivered }) {
  const isDelivered = route.status === 'Entregado';

  return (
    <tr>
      <td className="px-4 py-3 font-semibold text-slate-900">{route.customer}</td>
      <td className="px-4 py-3">
        <p className="font-medium text-slate-800">{route.address}</p>
        <p className="text-xs text-slate-400">Ref: {route.reference}</p>
      </td>
      <td className="px-4 py-3 font-bold text-slate-800">{route.quantity} Garrafones</td>
      <td className="px-4 py-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
            isDelivered
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {route.status}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        {!isDelivered ? (
          <button
            type="button"
            onClick={() => onMarkDelivered?.(route.id)}
            className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Marcar Entregado
          </button>
        ) : (
          <span className="text-xs text-emerald-600 font-bold">✓ Completado</span>
        )}
      </td>
    </tr>
  );
}

