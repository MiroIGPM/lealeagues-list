import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib';
import { LeagueProvider } from './features/leagues/context/LeagueContext';
import { Layout, ErrorBoundary } from './components';
import { HomePage } from './pages';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LeagueProvider>
        <Layout>
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        </Layout>
      </LeagueProvider>
    </QueryClientProvider>
  );
};

export default App;
