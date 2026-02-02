import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeagueCard } from './LeagueCard';
import type { League } from '../../../../types';

const mockLeague: League = {
  idLeague: '1',
  strLeague: 'Premier League',
  strSport: 'Soccer',
  strLeagueAlternate: 'EPL',
};

describe('LeagueCard', () => {
  it('renders league name', () => {
    render(<LeagueCard league={mockLeague} onClick={vi.fn()} />);
    expect(screen.getByText('Premier League')).toBeInTheDocument();
  });

  it('renders sport name', () => {
    render(<LeagueCard league={mockLeague} onClick={vi.fn()} />);
    expect(screen.getByText('Soccer')).toBeInTheDocument();
  });

  it('renders alternate name when available', () => {
    render(<LeagueCard league={mockLeague} onClick={vi.fn()} />);
    expect(screen.getByText('EPL')).toBeInTheDocument();
  });

  it('does not render alternate name when null', () => {
    const leagueWithoutAlternate = { ...mockLeague, strLeagueAlternate: null };
    render(<LeagueCard league={leagueWithoutAlternate} onClick={vi.fn()} />);
    expect(screen.queryByText('EPL')).not.toBeInTheDocument();
  });

  it('calls onClick with league when clicked', () => {
    const handleClick = vi.fn();
    render(<LeagueCard league={mockLeague} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockLeague);
  });
});
