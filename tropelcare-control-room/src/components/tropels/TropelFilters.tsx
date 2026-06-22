import type { Species, VitalState } from '../../types';
import { SPECIES_LIST, VITAL_STATES } from '../../utils/constants';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface TropelFiltersProps {
  species: Species | undefined;
  vitalState: VitalState | undefined;
  q: string | undefined;
  onSpeciesChange: (v: string) => void;
  onVitalStateChange: (v: string) => void;
  onQChange: (v: string) => void;
}

export function TropelFilters({
  species,
  vitalState,
  q,
  onSpeciesChange,
  onVitalStateChange,
  onQChange,
}: TropelFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      <Input
        id="search"
        label="Buscar"
        placeholder="Nombre..."
        value={q ?? ''}
        onChange={(e) => onQChange(e.target.value)}
        className="w-48"
      />
      <Select
        id="species"
        label="Especie"
        value={species ?? ''}
        onChange={(e) => onSpeciesChange(e.target.value)}
        options={SPECIES_LIST.map((s) => ({ value: s, label: s }))}
      />
      <Select
        id="vitalState"
        label="Estado Vital"
        value={vitalState ?? ''}
        onChange={(e) => onVitalStateChange(e.target.value)}
        options={VITAL_STATES.map((s) => ({ value: s, label: s }))}
      />
    </div>
  );
}
