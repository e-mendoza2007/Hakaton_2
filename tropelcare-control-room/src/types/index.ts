export type Species = 'BLOBITO' | 'CHISPA' | 'GRUNON' | 'DORMILON' | 'GLITCHY';
export type VitalState = 'ESTABLE' | 'HAMBRIENTO' | 'AGITADO' | 'MUTANDO' | 'CRITICO';
export type SignalType = 'HAMBRE' | 'ABANDONO' | 'MUTACION' | 'FUGA' | 'CONFLICTO' | 'REPRODUCCION_MASIVA' | 'SENAL_CORRUPTA';
export type Severity = 'LEVE' | 'MODERADO' | 'GRAVE' | 'CRITICO';
export type SignalStatus = 'RECIBIDA' | 'PROCESANDO' | 'ATENDIDA';
export type TropelSort = 'name,asc' | 'updatedAt,desc' | 'chaosIndex,desc';
export type Climate = 'PIXEL_FOREST' | 'NEON_CAVE' | 'CLOUD_AQUARIUM' | 'RETRO_ARCADE';

export interface User {
  id: string;
  displayName: string;
  email: string;
  teamCode: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface AuthMeResponse {
  user: User;
}

export interface DashboardSummary {
  totalTropels: number;
  criticalTropels: number;
  openSignals: number;
  sectorStabilityAvg: number;
  signalsBySeverity: Record<string, number>;
  generatedAt: string;
}

export interface TropelSectorRef {
  id: string;
  name: string;
  sectorCode: string;
}

export interface TropelDTO {
  id: string;
  name: string;
  species: Species;
  vitalState: VitalState;
  energyLevel: number;
  chaosIndex: number;
  mutationStage: number;
  guardianName: string;
  sector: TropelSectorRef;
  createdAt: string;
  updatedAt: string;
}

export interface TropelDetailDTO extends TropelDTO {
  hungerLevel?: number;
  mutationLevel?: number;
  lastSignalAt?: string | null;
  description?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface TropelRef {
  id: string;
  name: string;
  species: Species;
}

export interface SignalDTO {
  id: string;
  signalType: SignalType;
  severity: Severity;
  status: SignalStatus;
  rawContent: string;
  tropel: TropelRef;
  createdAt: string;
  updatedAt: string;
}

export interface SignalDetailDTO extends SignalDTO {
  description?: string;
  metadata?: Record<string, string>;
}

export interface SignalFeedResponse {
  items: SignalDTO[];
  nextCursor: string | null;
  hasMore: boolean;
  totalEstimate: number;
}

export interface SectorDTO {
  id: string;
  sectorCode: string;
  name: string;
  climate: string;
  capacity: number;
  currentLoad: number;
  stabilityLevel: number;
}

export interface SectorListResponse {
  items: SectorDTO[];
}

export interface StageMetrics {
  stability: number;
  energy: number;
  alerts: number;
}

export interface StoryStage {
  id: string;
  order: number;
  title: string;
  narrative: string;
  dominantEvent: string;
  metrics: StageMetrics;
  assetKey: string;
  colorToken: string;
  progress: number;
}

export interface StorySectorSummary {
  id: string;
  name: string;
  climate: Climate;
  sectorCode?: string;
  capacity?: number;
  currentLoad?: number;
  stabilityLevel?: number;
}

export interface SectorStoryResponse {
  sector: StorySectorSummary;
  stages: StoryStage[];
}

export interface ApiError {
  error: string;
  message: string;
  timestamp: string;
  path: string;
  details?: string;
}
