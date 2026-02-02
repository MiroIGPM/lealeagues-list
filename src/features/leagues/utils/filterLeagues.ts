import type { League, FilterState } from '../../../types';

export const filterLeagues = (
  leagues: League[],
  filters: FilterState
): League[] => {
  const { searchTerm, sportFilter } = filters;
  
  if (!searchTerm && !sportFilter) return leagues;
  
  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  return leagues.filter((league) => {
    const matchesSearch = !lowerSearchTerm || 
      league.strLeague.toLowerCase().includes(lowerSearchTerm) ||
      league.strLeagueAlternate?.toLowerCase().includes(lowerSearchTerm);

    const matchesSport = !sportFilter || league.strSport === sportFilter;

    return matchesSearch && matchesSport;
  });
};

export const getUniqueSports = (leagues: League[]): string[] => {
  return leagues
    .map(league => league.strSport)
    .filter((sport, index, array) => array.indexOf(sport) === index)
    .sort();
};