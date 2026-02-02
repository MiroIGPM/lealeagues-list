import { apiFetch, LeaguesResponse } from '../../../services/api';
import type { League } from '../../../types';
import { ALL_LEAGUES_URL } from '../constants/constants';

export const fetchLeagues = async (): Promise<League[]> => {
  const response = await apiFetch<LeaguesResponse>(ALL_LEAGUES_URL);
  return response.leagues || [];
};
