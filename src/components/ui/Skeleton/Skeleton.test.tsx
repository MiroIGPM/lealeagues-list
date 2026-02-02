import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton, CardSkeleton, ListSkeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default class', () => {
    render(<Skeleton />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Skeleton className="w-48 h-48" />);
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toHaveClass('w-48', 'h-48');
  });
});

describe('CardSkeleton', () => {
  it('renders loading skeleton', () => {
    render(<CardSkeleton />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

describe('ListSkeleton', () => {
  it('renders default count of skeletons', () => {
    render(<ListSkeleton />);
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(6);
  });

  it('renders custom count of skeletons', () => {
    render(<ListSkeleton count={3} />);
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(3);
  });
});
