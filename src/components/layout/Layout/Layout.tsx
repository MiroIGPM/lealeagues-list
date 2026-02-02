import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Page } from '../Page/Page';
import type { LayoutProps } from './types';

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title={title} />
      <Page>{children}</Page>
      <Footer />
    </div>
  );
};
