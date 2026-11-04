import InventoryMetrics from '@/components/admin/InventoryMetrics';
import InventoryUpdateForm from '@/components/admin/InventoryUpdateForm';

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Control de Inventario</h1>
      <InventoryMetrics />
      <InventoryUpdateForm />
    </div>
  );
}
