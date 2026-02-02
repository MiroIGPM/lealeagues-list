import { apiFetch } from '../../../services/api';
import type { SeasonsResponse } from '../../../services/api/types';
import type { Season } from '../../../types';
import { SEASONS_URL } from '../constants/constants';

export const fetchSeasons = async (leagueId: string): Promise<Season[]> => {
  const params = new URLSearchParams({ badge: '1', id: leagueId });
  const url = `${SEASONS_URL}${params}`;
  const response = await apiFetch<SeasonsResponse>(url);

  if (!response.seasons || response.seasons.length === 0) {
    return [];
  }

  return response.seasons;
};
