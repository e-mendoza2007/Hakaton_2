import { useState, useCallback, useEffect, useRef } from 'react';
import type { SignalDTO, SignalType, Severity, SignalStatus } from '../types';
import { signalService } from '../services/signalService';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { SignalFeed } from '../components/signals/SignalFeed';
import { SignalDetail } from '../components/signals/SignalDetail';
import { Select } from '../components/common/Select';
import { Input } from '../components/common/Input';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { SIGNAL_TYPES, SEVERITIES, SIGNAL_STATUSES } from '../utils/constants';

export function Signals() {
  const { filters, setFilter } = useUrlFilters({
    signalType: undefined,
    severity: undefined,
    status: undefined,
    q: undefined,
  });

  const signalType = filters.signalType as SignalType | undefined;
  const severity = filters.severity as Severity | undefined;
  const status = filters.status as SignalStatus | undefined;
  const q = filters.q;

  const [items, setItems] = useState<SignalDTO[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const staleRef = useRef(false);

  const loadInitial = useCallback(() => {
    staleRef.current = true;
    const currentStale = Symbol();
    const stale = currentStale;
    setLoading(true);
    setInitialLoading(true);
    setError(null);
    setPageError(null);

    signalService.feed({
      cursor: null,
      limit: 15,
      signalType,
      severity,
      status,
      q: q || undefined,
    })
      .then((res) => {
        if (stale !== currentStale) return;
        setItems(res.data.items);
        setCursor(res.data.nextCursor);
        setHasMore(res.data.hasMore);
        staleRef.current = false;
      })
      .catch(() => {
        if (stale !== currentStale) return;
        setError('Error al cargar señales');
        staleRef.current = false;
      })
      .finally(() => {
        if (stale !== currentStale) return;
        setLoading(false);
        setInitialLoading(false);
      });
  }, [signalType, severity, status, q]);

  useEffect(() => { loadInitial(); }, [loadInitial]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore || staleRef.current) return;
    setPageError(null);
    setLoading(true);
    const currentStale = Symbol();
    const stale = currentStale;

    signalService.feed({
      cursor,
      limit: 15,
      signalType,
      severity,
      status,
      q: q || undefined,
    })
      .then((res) => {
        if (stale !== currentStale) return;
        setItems((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const newItems = res.data.items.filter((i) => !existingIds.has(i.id));
          return [...prev, ...newItems];
        });
        setCursor(res.data.nextCursor);
        setHasMore(res.data.hasMore);
      })
      .catch(() => {
        if (stale !== currentStale) return;
        setPageError('Error al cargar más señales');
      })
      .finally(() => {
        if (stale !== currentStale) return;
        setLoading(false);
      });
  }, [cursor, loading, hasMore, signalType, severity, status, q]);

  const { sentinelRef } = useInfiniteScroll({
    enabled: !loading && hasMore && !error,
    onLoadMore: loadMore,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilter(key, value === '' ? undefined : value);
  };

  const handleStatusChange = useCallback((id: string, newStatus: SignalStatus) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Feed de Señales</h2>

      <div className="flex flex-wrap gap-3 items-end">
        <Input
          id="search"
          label="Buscar"
          placeholder="Buscar señales..."
          value={q ?? ''}
          onChange={(e) => handleFilterChange('q', e.target.value)}
          className="w-48"
        />
        <Select
          id="signalType"
          label="Tipo"
          value={signalType ?? ''}
          onChange={(e) => handleFilterChange('signalType', e.target.value)}
          options={SIGNAL_TYPES.map((s) => ({ value: s, label: s }))}
        />
        <Select
          id="severity"
          label="Severidad"
          value={severity ?? ''}
          onChange={(e) => handleFilterChange('severity', e.target.value)}
          options={SEVERITIES.map((s) => ({ value: s, label: s }))}
        />
        <Select
          id="status"
          label="Estado"
          value={status ?? ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={SIGNAL_STATUSES.map((s) => ({ value: s, label: s }))}
        />
      </div>

      {error && <ErrorMessage message={error} onRetry={loadInitial} />}

      {!error && (
        <SignalFeed
          items={items}
          hasMore={hasMore}
          loading={loading && !initialLoading}
          error={pageError}
          sentinelRef={sentinelRef as React.RefObject<HTMLDivElement | null>}
          onSelect={setSelectedId}
          onRetry={loadMore}
        />
      )}

      {initialLoading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {selectedId && (
        <SignalDetail
          signalId={selectedId}
          open={true}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
