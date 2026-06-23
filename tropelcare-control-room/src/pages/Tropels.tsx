import { useEffect, useState, useCallback, useRef } from 'react';
import type { TropelDTO, TropelSort, Species, VitalState, SectorDTO } from '../types';
import { tropelService } from '../services/tropelService';
import { sectorService } from '../services/sectorService';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { TropelFilters } from '../components/tropels/TropelFilters';
import { TropelList } from '../components/tropels/TropelList';
import { Spinner } from '../components/common/Spinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { SORT_OPTIONS } from '../utils/constants';

const DEFAULT_SIZE = 20;

export function Tropels() {
  const { filters, setFilter } = useUrlFilters({
    page: '0',
    species: undefined,
    vitalState: undefined,
    sectorId: undefined,
    q: undefined,
    sort: 'updatedAt,desc',
  });

  const page = parseInt(filters.page ?? '0', 10);
  const species = filters.species as Species | undefined;
  const vitalState = filters.vitalState as VitalState | undefined;
  const sectorId = filters.sectorId;
  const q = filters.q;
  const sort = (filters.sort ?? 'updatedAt,desc') as TropelSort;

  const [data, setData] = useState<{ items: TropelDTO[]; totalPages: number; totalElements: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorDTO[]>([]);
  const requestIdRef = useRef(0);

  useEffect(() => {
    sectorService.list()
      .then((res) => setSectors(res.data.items))
      .catch(() => {});
  }, []);

  const load = useCallback(() => {
    const reqId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    tropelService.list({
      page,
      size: DEFAULT_SIZE,
      species,
      vitalState,
      sectorId: sectorId || undefined,
      q: q || undefined,
      sort,
    })
      .then((res) => {
        if (reqId === requestIdRef.current) {
          setData({
            items: res.data.content,
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
          });
        }
      })
      .catch(() => {
        if (reqId === requestIdRef.current) {
          setError('Error al cargar tropeles');
        }
      })
      .finally(() => {
        if (reqId === requestIdRef.current) {
          setLoading(false);
        }
      });
  }, [page, species, vitalState, sectorId, q, sort]);

  useEffect(() => { load(); }, [load]);

  const handleFilterChange = (key: string, value: string) => {
    setFilter(key, value === '' ? undefined : value);
    setFilter('page', '0');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Atlas de Tropeles</h2>
        <select
          value={sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-cyan-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <TropelFilters
        species={species}
        vitalState={vitalState}
        sectorId={sectorId}
        q={q}
        sectors={sectors}
        onSpeciesChange={(v) => handleFilterChange('species', v)}
        onVitalStateChange={(v) => handleFilterChange('vitalState', v)}
        onSectorIdChange={(v) => handleFilterChange('sectorId', v)}
        onQChange={(v) => handleFilterChange('q', v)}
      />

      {error && <ErrorMessage message={error} onRetry={load} />}

      {loading && <Spinner />}

      {!loading && !error && data && (
        <>
          <p className="text-sm text-gray-500">
            {data.totalElements} tropeles encontrados
          </p>
          <TropelList items={data.items} />
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setFilter('page', String(Math.max(0, page - 1)))}
                disabled={page === 0}
                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm disabled:opacity-50 hover:border-cyan-600 transition-colors"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-400">
                Página {page + 1} de {data.totalPages}
              </span>
              <button
                onClick={() => setFilter('page', String(Math.min(data.totalPages - 1, page + 1)))}
                disabled={page >= data.totalPages - 1}
                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm disabled:opacity-50 hover:border-cyan-600 transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
