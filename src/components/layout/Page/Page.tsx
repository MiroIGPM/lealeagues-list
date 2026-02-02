import type { PageProps } from './types';

export const Page = ({ children }: PageProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex-1" style={{width: "100%"}}>
      {children}
    </main>
  );
};
