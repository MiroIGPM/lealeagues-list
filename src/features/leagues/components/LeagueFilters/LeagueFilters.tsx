import { useState, useEffect } from 'react';
import { SearchInput, Select } from '../../../../components/ui';
import { useLeagueContext } from '../../context/LeagueContext';
import { LeagueFiltersProps } from '../../types/types';
import { useDebounce, DEBOUNCE_DELAY } from '../../../../hooks';

export const LeagueFilters = ({ sports }: LeagueFiltersProps) => {
  const {
    filters,
    setSearchTerm,
    setSportFilter,
    clearFilters,
  } = useLeagueContext();

  const [localSearch, setLocalSearch] = useState(filters.searchTerm);

  const debouncedSearch = useDebounce(localSearch, DEBOUNCE_DELAY);
  const hasActiveFilters = filters.searchTerm || filters.sportFilter;

  useEffect(() => {
    if (debouncedSearch !== filters.searchTerm) {
      setSearchTerm(debouncedSearch);
    }
  }, [debouncedSearch, setSearchTerm, filters.searchTerm]);

  const handleClear = () => {
    setLocalSearch(''); 
    clearFilters();   
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <SearchInput
          value={localSearch}
          onChange={setLocalSearch}
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
          onClick={handleClear}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
