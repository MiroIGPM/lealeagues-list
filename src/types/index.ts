export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

export interface Season {
  strSeason: string;
  strBadge: string;
}

export interface FilterState {
  searchTerm: string;
  sportFilter: string;
}
