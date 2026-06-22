import { useEffect, useState } from 'react';
import type { DashboardSummary } from '../types';
import { dashboardService } from '../services/dashboardService';
import { Card } from '../components/common/Card';
import { Spinner } from '../components/common/Spinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

export function Dashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    dashboardService.summary()
      .then((res) => setData(res.data))
      .catch(() => setError('Error al cargar el dashboard'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!data) return <ErrorMessage message="No hay datos disponibles" />;

  const severityEntries = data.signalsBySeverity
    ? Object.entries(data.signalsBySeverity)
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-400">Total Tropeles</p>
          <p className="text-3xl font-bold text-cyan-400">{data.totalTropels}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Tropeles Críticos</p>
          <p className="text-3xl font-bold text-red-400">{data.criticalTropels}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Señales Abiertas</p>
          <p className="text-3xl font-bold text-yellow-400">{data.openSignals}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-400">Estabilidad Promedio</p>
          <p className="text-3xl font-bold text-green-400">
            {data.sectorStabilityAvg.toFixed(1)}
          </p>
        </Card>
      </div>
      {severityEntries.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold mb-3">Señales por Severidad</h3>
          <div className="space-y-2">
            {severityEntries.map(([severity, count]) => (
              <div key={severity} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">{severity}</span>
                <span className="text-sm font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      <p className="text-xs text-gray-500">
        Última actualización: {new Date(data.generatedAt).toLocaleString('es-ES')}
      </p>
    </div>
  );
}
