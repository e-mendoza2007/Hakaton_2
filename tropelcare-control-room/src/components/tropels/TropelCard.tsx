import type { TropelDTO } from '../../types';
import { SPECIES_COLORS, VITAL_STATE_COLORS } from '../../utils/constants';

interface TropelCardProps {
  tropel: TropelDTO;
  onClick?: () => void;
}

export function TropelCard({ tropel, onClick }: TropelCardProps) {
  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-cyan-600 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-100">{tropel.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${SPECIES_COLORS[tropel.species]}`}>
          {tropel.species}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <span className={`px-2 py-0.5 rounded-full ${VITAL_STATE_COLORS[tropel.vitalState]}`}>
          {tropel.vitalState}
        </span>
        <span>Sector: {tropel.sector.name}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">
          Caos: {tropel.chaosIndex}
        </span>
        <span className="text-gray-500">
          {new Date(tropel.updatedAt).toLocaleDateString('es-ES')}
        </span>
      </div>
    </div>
  );
}
