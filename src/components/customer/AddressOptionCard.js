'use client';

export default function AddressOptionCard({ address, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border text-left cursor-pointer transition flex items-start justify-between ${
        isSelected
          ? 'border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900">{address.alias}</span>
          {address.isDefault && (
            <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Principal
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 font-medium">
          {address.street}, {address.colonia}
        </p>
        <p className="text-xs text-slate-400">C.P. {address.cp}</p>
        {address.reference && (
          <p className="text-xs text-slate-500 italic">📍 Ref: {address.reference}</p>
        )}
      </div>

      <div className="pt-0.5">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
            isSelected
              ? 'border-sky-600 bg-sky-600'
              : 'border-slate-300 bg-white'
          }`}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
      </div>
    </div>
  );
}

