import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LeagueFilters } from './LeagueFilters';
import { DEBOUNCE_DELAY } from '../../../../hooks';

const mockContextValue = {
  filters: { searchTerm: '', sportFilter: '' },
  setSearchTerm: vi.fn(),
  setSportFilter: vi.fn(),
  clearFilters: vi.fn(),
  leagues: [],
  filteredLeagues: [],
  sports: [],
  selectedLeague: null,
  selectLeague: vi.fn(),
  clearSelection: vi.fn(),
  isLoading: false,
  isError: false,
  error: null,
  refetch: vi.fn(),
};

vi.mock('../../context/LeagueContext', () => ({
  useLeagueContext: () => mockContextValue,
}));

describe('LeagueFilters', () => {
  const sports = ['Soccer', 'Basketball', 'Tennis'];

  beforeEach(() => {
    vi.clearAllMocks();
    mockContextValue.filters = { searchTerm: '', sportFilter: '' };
  });

  it('renders search input', () => {
    render(<LeagueFilters sports={sports} />);
    expect(screen.getByPlaceholderText('Search leagues...')).toBeInTheDocument();
  });

  it('renders sport select', () => {
    render(<LeagueFilters sports={sports} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls setSearchTerm after debounce on input change', async () => {
    vi.useFakeTimers();

    render(<LeagueFilters sports={sports} />);

    fireEvent.change(screen.getByPlaceholderText('Search leagues...'), {
      target: { value: 'test' },
    });

    expect(mockContextValue.setSearchTerm).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(DEBOUNCE_DELAY);
    });

    expect(mockContextValue.setSearchTerm).toHaveBeenCalledWith('test');

    vi.useRealTimers();
  });

  it('calls setSportFilter on select change', () => {
    render(<LeagueFilters sports={sports} />);

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Soccer' },
    });

    expect(mockContextValue.setSportFilter).toHaveBeenCalledWith('Soccer');
  });

  it('shows clear button when filters are active', () => {
    mockContextValue.filters = { searchTerm: 'test', sportFilter: '' };
    render(<LeagueFilters sports={sports} />);
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('hides clear button when no filters are active', () => {
    mockContextValue.filters = { searchTerm: '', sportFilter: '' };
    render(<LeagueFilters sports={sports} />);
    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
  });

  it('calls clearFilters when clear button is clicked', () => {
    mockContextValue.filters = { searchTerm: 'test', sportFilter: '' };
    render(<LeagueFilters sports={sports} />);

    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockContextValue.clearFilters).toHaveBeenCalled();
  });
});
