import api from './api';
import type { SectorListResponse, SectorStoryResponse } from '../types';

export const sectorService = {
  list: () => api.get<SectorListResponse>('/sectors'),

  story: (id: string) => api.get<SectorStoryResponse>(`/sectors/${id}/story`),
};
