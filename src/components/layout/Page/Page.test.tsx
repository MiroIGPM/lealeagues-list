import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page } from './Page';

describe('Page', () => {
  it('renders children', () => {
    render(<Page>Page Content</Page>);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('renders as main element', () => {
    render(<Page>Content</Page>);
    expect(document.querySelector('main')).toBeInTheDocument();
  });
});
