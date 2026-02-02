/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLeagues } from '../api/leagues';
import { filterLeagues, getUniqueSports } from '../utils/filterLeagues';
import { LEAGUES_QUERY_KEY } from '../constants/constants';
import type { League, FilterState } from '../../../types';

interface LeagueContextValue {
  leagues: League[] | undefined;
  filteredLeagues: League[];
  sports: string[];
  filters: FilterState;
  setSearchTerm: (term: string) => void;
  setSportFilter: (sport: string) => void;
  clearFilters: () => void;
  selectedLeague: League | null;
  selectLeague: (league: League) => void;
  clearSelection: () => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

const LeagueContext = createContext<LeagueContextValue | undefined>(undefined);

const initialFilters: FilterState = {
  searchTerm: '',
  sportFilter: '',
};

export const LeagueProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  const {
    data: leagues,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<League[], Error>({
    queryKey: LEAGUES_QUERY_KEY,
    queryFn: fetchLeagues,
  });

  const sports = useMemo(() => {
    return leagues ? getUniqueSports(leagues) : [];
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    if (!leagues) return [];
    return filterLeagues(leagues, {
      searchTerm: filters.searchTerm,
      sportFilter: filters.sportFilter,
    });
  }, [leagues, filters.searchTerm, filters.sportFilter]);

  const value = useMemo<LeagueContextValue>(
    () => ({
      leagues,
      filteredLeagues,
      sports,
      filters,
      setSearchTerm: (term: string) =>
        setFilters((prev) => ({ ...prev, searchTerm: term })),
      setSportFilter: (sport: string) =>
        setFilters((prev) => ({ ...prev, sportFilter: sport })),
      clearFilters: () => setFilters(initialFilters),
      selectedLeague,
      selectLeague: setSelectedLeague,
      clearSelection: () => setSelectedLeague(null),
      isLoading,
      isError,
      error,
      refetch,
    }),
    [
      leagues,
      filteredLeagues,
      sports,
      filters,
      selectedLeague,
      isLoading,
      isError,
      error,
      refetch,
    ]
  );

  return (
    <LeagueContext.Provider value={value}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeagueContext = (): LeagueContextValue => {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error('useLeagueContext must be used within a LeagueProvider');
  }
  return context;
};
