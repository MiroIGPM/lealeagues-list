import { Card } from '../../../../components/ui';
import type { LeagueCardProps } from '../../types/types';

export const LeagueCard = ({ league, onClick }: LeagueCardProps) => {
  const handleClick = () => {
    onClick(league);
  };
 
  const { strSport, strLeague, strLeagueAlternate } = league;

  return (
    <Card onClick={handleClick}>
      <h3
        className="text-lg font-semibold text-gray-900 mb-1 truncate"
        title={strLeague}
      >
        {strLeague}
      </h3>
      <p className="text-sm text-blue-600 font-medium mb-1">{strSport}</p>
      {league.strLeagueAlternate && (
        <p className="text-sm text-gray-500 truncate" title={strLeagueAlternate ?? undefined}>
          {strLeagueAlternate}
        </p>
      )}
    </Card>
  );
};
