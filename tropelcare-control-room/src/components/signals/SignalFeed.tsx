import type { SignalDTO } from '../../types';
import { SignalCard } from './SignalCard';

interface SignalFeedProps {
  items: SignalDTO[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  onSelect?: (id: string) => void;
  onRetry?: () => void;
}

export function SignalFeed({
  items,
  hasMore,
  loading,
  error,
  sentinelRef,
  onSelect,
  onRetry,
}: SignalFeedProps) {
  if (items.length === 0 && !loading && !error) {
    return (
      <p className="text-gray-500 text-center py-8">
        No se encontraron señales.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          onClick={() => onSelect?.(signal.id)}
        />
      ))}

      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-4">
          <p className="text-red-400 text-sm mb-2">{error}</p>
          <button
            onClick={onRetry}
            className="text-sm text-cyan-400 hover:underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-gray-500 text-sm py-4">
          No hay más señales
        </p>
      )}

      <div ref={sentinelRef} className="h-4" />
    </div>
  );
}
