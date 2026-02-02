import type { SkeletonProps, LeagueListSkeletonProps } from './types';

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      aria-hidden="true"
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg" data-testid="loading-skeleton">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export const ListSkeleton = ({ count = 6 }: LeagueListSkeletonProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
