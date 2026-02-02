import { useQuery } from '@tanstack/react-query';
import { fetchSeasons } from '../api/seasons';
import { SEASONS_QUERY_KEY } from '../constants/constants';
import type { Season } from '../../../types';

export const useSeasons = (leagueId: string | null) => {
  return useQuery<Season[], Error>({
    queryKey: [...SEASONS_QUERY_KEY, leagueId],
    queryFn: () => fetchSeasons(leagueId!),
    enabled: !!leagueId,
  });
};
