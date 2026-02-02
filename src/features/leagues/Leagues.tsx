import { ListSkeleton, VirtualizedList, ErrorState, EmptyState } from '../../components/ui';
import { VIRTUAL_LIST_OVERSCAN, ESTIMATED_ROW_HEIGHT } from './constants/constants';
import { useLeagueContext } from './context/LeagueContext';
import { LeagueCard } from './components/LeagueCard/LeagueCard';
import { LeagueFilters } from './components/LeagueFilters/LeagueFilters';
import { SeasonBadgeModal } from '../badges/Badges';

export const Leagues = () => {
  const {
    filteredLeagues,
    sports,
    selectedLeague,
    selectLeague,
    clearSelection,
    clearFilters,
    isLoading,
    isError,
    error,
    refetch,
  } = useLeagueContext();

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="w-full sm:w-48 h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <ListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load leagues"
        message={error?.message || 'An unexpected error occurred'}
        onAction={refetch}
      />
    );
  }

  return (
    <div>
      <LeagueFilters sports={sports} />

      {filteredLeagues.length === 0 ? (
        <EmptyState
          title="No leagues found matching your criteria"
          message="Try adjusting your search or filters"
          onAction={clearFilters}
        />
      ) : (
        <VirtualizedList
          items={filteredLeagues}
          renderItem={(league) => (
            <LeagueCard league={league} onClick={selectLeague} />
          )}
          keyExtractor={(league) => league.idLeague}
          estimatedRowHeight={ESTIMATED_ROW_HEIGHT}
          overscan={VIRTUAL_LIST_OVERSCAN}
        />
      )}

      <SeasonBadgeModal league={selectedLeague} onClose={clearSelection} />
    </div>
  );
};
