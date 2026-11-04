export default function DeliveryAddressForm({
  formData = { street: '', colonia: '', cp: '', reference: '' },
  onChange,
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.name, e.target.value);
    }
  };

  return (
    <div className="space-y-3 pt-3">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Calle y Número</label>
        <input
          type="text"
          name="street"
          value={formData.street || ''}
          onChange={handleChange}
          placeholder="Ej. Av. Hidalgo #123"
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Colonia</label>
          <input
            type="text"
            name="colonia"
            value={formData.colonia || ''}
            onChange={handleChange}
            placeholder="Ej. Centro"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Código Postal</label>
          <input
            type="text"
            name="cp"
            value={formData.cp || ''}
            onChange={handleChange}
            placeholder="86000"
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Referencias de la casa</label>
        <textarea
          rows={2}
          name="reference"
          value={formData.reference || ''}
          onChange={handleChange}
          placeholder="Ej. Portón color blanco, frente a la tiendita..."
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
        />
      </div>
    </div>
  );
}
