import type { TropelDTO } from '../../types';
import { TropelCard } from './TropelCard';

interface TropelListProps {
  items: TropelDTO[];
  onSelect?: (id: string) => void;
}

export function TropelList({ items, onSelect }: TropelListProps) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No se encontraron tropeles.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((tropel) => (
        <TropelCard
          key={tropel.id}
          tropel={tropel}
          onClick={() => onSelect?.(tropel.id)}
        />
      ))}
    </div>
  );
}
