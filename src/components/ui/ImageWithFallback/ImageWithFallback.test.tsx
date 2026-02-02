import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders image with src and alt', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('applies className to image', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test" className="custom-class" />);
    expect(screen.getByAltText('Test')).toHaveClass('custom-class');
  });

  it('shows fallback on error', () => {
    render(<ImageWithFallback src="invalid.jpg" alt="Test" />);

    fireEvent.error(screen.getByAltText('Test'));

    expect(screen.getByText('Image could not be loaded')).toBeInTheDocument();
  });

  it('has lazy loading attribute', () => {
    render(<ImageWithFallback src="test.jpg" alt="Test" />);
    expect(screen.getByAltText('Test')).toHaveAttribute('loading', 'lazy');
  });
});
