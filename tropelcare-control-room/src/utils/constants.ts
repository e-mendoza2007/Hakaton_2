import type { Species, VitalState, SignalType, Severity, SignalStatus, TropelSort } from '../types';

export const SPECIES_LIST: Species[] = ['BLOBITO', 'CHISPA', 'GRUNON', 'DORMILON', 'GLITCHY'];
export const VITAL_STATES: VitalState[] = ['ESTABLE', 'HAMBRIENTO', 'AGITADO', 'MUTANDO', 'CRITICO'];
export const SIGNAL_TYPES: SignalType[] = ['HAMBRE', 'ABANDONO', 'MUTACION', 'FUGA', 'CONFLICTO', 'REPRODUCCION_MASIVA', 'SENAL_CORRUPTA'];
export const SEVERITIES: Severity[] = ['LEVE', 'MODERADO', 'GRAVE', 'CRITICO'];
export const SIGNAL_STATUSES: SignalStatus[] = ['RECIBIDA', 'PROCESANDO', 'ATENDIDA'];
export const SORT_OPTIONS: { value: TropelSort; label: string }[] = [
  { value: 'updatedAt,desc', label: 'Más recientes' },
  { value: 'name,asc', label: 'Nombre A-Z' },
  { value: 'chaosIndex,desc', label: 'Más caóticos' },
];

export const SPECIES_COLORS: Record<Species, string> = {
  BLOBITO: 'text-green-400 bg-green-400/10',
  CHISPA: 'text-yellow-400 bg-yellow-400/10',
  GRUNON: 'text-red-400 bg-red-400/10',
  DORMILON: 'text-blue-400 bg-blue-400/10',
  GLITCHY: 'text-purple-400 bg-purple-400/10',
};

export const VITAL_STATE_COLORS: Record<VitalState, string> = {
  ESTABLE: 'text-green-400 bg-green-400/10',
  HAMBRIENTO: 'text-yellow-400 bg-yellow-400/10',
  AGITADO: 'text-orange-400 bg-orange-400/10',
  MUTANDO: 'text-purple-400 bg-purple-400/10',
  CRITICO: 'text-red-400 bg-red-400/10',
};

export const SEVERITY_COLORS: Record<Severity, string> = {
  LEVE: 'text-green-400 bg-green-400/10',
  MODERADO: 'text-yellow-400 bg-yellow-400/10',
  GRAVE: 'text-orange-400 bg-orange-400/10',
  CRITICO: 'text-red-400 bg-red-400/10',
};

export const SIGNAL_STATUS_COLORS: Record<SignalStatus, string> = {
  RECIBIDA: 'text-blue-400 bg-blue-400/10',
  PROCESANDO: 'text-yellow-400 bg-yellow-400/10',
  ATENDIDA: 'text-green-400 bg-green-400/10',
};
