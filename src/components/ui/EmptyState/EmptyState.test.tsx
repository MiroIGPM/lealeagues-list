import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders with default props', () => {
    render(<EmptyState />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(<EmptyState title="Nothing here" message="Add some items" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Add some items')).toBeInTheDocument();
  });

  it('renders action button when onAction is provided', () => {
    render(<EmptyState onAction={vi.fn()} />);
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  it('does not render action button when onAction is not provided', () => {
    render(<EmptyState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onAction when button is clicked', () => {
    const handleAction = vi.fn();
    render(<EmptyState onAction={handleAction} />);

    fireEvent.click(screen.getByText('Clear Filters'));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('renders custom action label', () => {
    render(<EmptyState onAction={vi.fn()} actionLabel="Reset" />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('has testid for testing', () => {
    render(<EmptyState />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
