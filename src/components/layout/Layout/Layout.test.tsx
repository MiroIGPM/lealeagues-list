import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders children', () => {
    render(<Layout>Test Content</Layout>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header with title', () => {
    render(<Layout title="Test Title">Content</Layout>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<Layout>Content</Layout>);
    expect(screen.getByText(/Sports Leagues App/)).toBeInTheDocument();
  });
});
