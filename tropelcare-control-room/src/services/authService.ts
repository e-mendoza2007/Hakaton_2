import api from './api';
import type { LoginResponse, AuthMeResponse } from '../types';

export const authService = {
  login: (teamCode: string, email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { teamCode, email, password }),

  me: () => api.get<AuthMeResponse>('/auth/me'),
};
