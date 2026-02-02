import { useState, useRef } from 'react';
import {
  Modal,
  Skeleton,
  Select,
  ImageWithFallback,
  ImagePlaceholderIcon,
  ErrorState,
  EmptyState,
} from '../../components/ui';
import { useSeasons } from './hooks/useSeasons';
import type { League } from '../../types';

export interface SeasonBadgeModalProps {
  league: League | null;
  onClose: () => void;
}

export const SeasonBadgeModal = (
  { league, onClose }: SeasonBadgeModalProps
) => {
  const { data: seasons, isLoading, isError, error } = useSeasons(
    league?.idLeague ?? null
  );
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const previousLeagueIdRef = useRef<string | null>(null);

  const isOpen = league !== null;
  const currentLeagueId = league?.idLeague ?? null;

  if (currentLeagueId !== previousLeagueIdRef.current) {
    previousLeagueIdRef.current = currentLeagueId;
    if (currentLeagueId !== null && selectedSeasonIndex !== 0) {
      setSelectedSeasonIndex(0);
    }
  }

  const seasonOptions = seasons?.map((s) => s.strSeason) ?? [];
  const selectedSeason = seasons?.[selectedSeasonIndex];

  const handleSeasonChange = (value: string) => {
    const index = seasonOptions.indexOf(value);
    if (index !== -1) {
      setSelectedSeasonIndex(index);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-900">
          {league?.strLeague}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{league?.strSport}</p>
      </Modal.Header>

      <Modal.Body>
        {isLoading && (
          <div className="flex flex-col items-center py-8">
            <Skeleton className="w-48 h-48 rounded-lg" />
            <Skeleton className="w-32 h-4 mt-4" />
          </div>
        )}

        {isError && (
          <ErrorState
            title="Failed to load badge"
            message={error?.message || 'An error occurred'}
          />
        )}

        {!isLoading && !isError && (!seasons || seasons.length === 0) && (
          <EmptyState
            title="No badge available"
            message="This league doesn't have any badges"
          />
        )}

        {!isLoading && !isError && seasons && seasons.length > 0 && (
          <div className="flex flex-col items-center py-4">
            {seasons.length > 1 && (
              <div className="w-full max-w-xs mb-4">
                <Select
                  value={selectedSeason?.strSeason ?? ''}
                  onChange={handleSeasonChange}
                  options={seasonOptions}
                  label="Select season"
                  placeholder="Select season"
                />
              </div>
            )}

            {selectedSeason?.strBadge ? (
              <ImageWithFallback
                src={selectedSeason.strBadge}
                alt={`${league?.strLeague} ${selectedSeason.strSeason} badge`}
                className="max-w-48 max-h-48 object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-48 h-48 bg-gray-100 rounded-lg">
                <ImagePlaceholderIcon className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">No badge for this season</p>
              </div>
            )}

            <p className="text-sm text-gray-600 mt-4">
              Season: {selectedSeason?.strSeason}
            </p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};
