import { SearchInput, Select } from '../../../../components/ui';
import { useLeagueContext } from '../../context/LeagueContext';
import type { LeagueFiltersProps } from '../../types/types';

export const LeagueFilters = ({ sports }: LeagueFiltersProps) => {
  const {
    filters,
    setSearchTerm,
    setSportFilter,
    clearFilters,
  } = useLeagueContext();

  const hasActiveFilters = filters.searchTerm || filters.sportFilter;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <SearchInput
          value={filters.searchTerm}
          onChange={setSearchTerm}
          placeholder="Search leagues..."
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          value={filters.sportFilter}
          onChange={setSportFilter}
          options={sports}
          placeholder="All Sports"
          label="Filter by sport"
        />
      </div>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
