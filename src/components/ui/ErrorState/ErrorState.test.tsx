import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('renders with default props', () => {
    render(<ErrorState />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(<ErrorState title="Custom Error" message="Custom message" />);
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom message')).toBeInTheDocument();
  });

  it('renders action button when onAction is provided', () => {
    render(<ErrorState onAction={vi.fn()} />);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('does not render action button when onAction is not provided', () => {
    render(<ErrorState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onAction when button is clicked', () => {
    const handleAction = vi.fn();
    render(<ErrorState onAction={handleAction} />);

    fireEvent.click(screen.getByText('Try Again'));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('renders custom action label', () => {
    render(<ErrorState onAction={vi.fn()} actionLabel="Retry" />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });
});
