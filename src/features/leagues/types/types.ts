import type { League } from '../../../types';

export interface LeagueCardProps {
  league: League;
  onClick: (league: League) => void;
}

export interface LeagueFiltersProps {
  sports: string[];
}
