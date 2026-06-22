import api from './api';
import type { SignalFeedResponse, SignalDetailDTO, SignalType, Severity, SignalStatus } from '../types';

export interface SignalFeedParams {
  cursor?: string | null;
  limit?: number;
  signalType?: SignalType;
  severity?: Severity;
  status?: SignalStatus;
  q?: string;
}

export const signalService = {
  feed: (params: SignalFeedParams) =>
    api.get<SignalFeedResponse>('/signals/feed', { params }),

  getById: (id: string) =>
    api.get<SignalDetailDTO>(`/signals/${id}`),

  updateStatus: (id: string, status: 'PROCESANDO' | 'ATENDIDA') =>
    api.patch(`/signals/${id}/status`, { status }),
};
