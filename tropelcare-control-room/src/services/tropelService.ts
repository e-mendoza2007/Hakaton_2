import api from './api';
import type { PageResponse, TropelDTO, TropelDetailDTO, Species, VitalState, TropelSort } from '../types';

export interface TropelParams {
  page: number;
  size: number;
  species?: Species;
  vitalState?: VitalState;
  sectorId?: string;
  q?: string;
  sort?: TropelSort;
}

export const tropelService = {
  list: (params: TropelParams) =>
    api.get<PageResponse<TropelDTO>>('/tropels', { params }),

  getById: (id: string) =>
    api.get<TropelDetailDTO>(`/tropels/${id}`),
};
