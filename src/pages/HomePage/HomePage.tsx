import { Suspense, lazy } from 'react';
import { ListSkeleton } from '../../components/ui';

const Leagues = lazy(() =>
  import('../../features').then((module) => ({
    default: module.Leagues,
  }))
);

export const HomePage = () => {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Leagues />
    </Suspense>
  );
};
