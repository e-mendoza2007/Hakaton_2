import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SectorDTO } from '../types';
import { sectorService } from '../services/sectorService';
import { Card } from '../components/common/Card';
import { Spinner } from '../components/common/Spinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

export function Sectors() {
  const [items, setItems] = useState<SectorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    setError(null);
    sectorService.list()
      .then((res) => setItems(res.data.items))
      .catch(() => setError('Error al cargar sectores'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleNavigate = useCallback((id: string) => {
    const vt = document.startViewTransition;
    if (vt) {
      vt(() => navigate(`/sectors/${id}/story`));
    } else {
      navigate(`/sectors/${id}/story`);
    }
  }, [navigate]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sectores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((sector) => (
          <Card
            key={sector.id}
            className="cursor-pointer hover:border-cyan-600 transition-colors"
            onClick={() => handleNavigate(sector.id)}
          >
            <h3 className="font-semibold text-lg">{sector.name}</h3>
            <p className="text-sm text-gray-400">{sector.sectorCode}</p>
            <p className="text-xs text-gray-500 mt-1">Clima: {sector.climate}</p>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-gray-400">
                Ocupación: {sector.currentLoad}/{sector.capacity}
              </span>
              <span className="text-cyan-400">
                Estabilidad: {sector.stabilityLevel.toFixed(1)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
