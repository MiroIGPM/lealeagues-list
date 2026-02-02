import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SearchIcon, ImagePlaceholderIcon } from './Icons';

describe('SearchIcon', () => {
  it('renders with default props', () => {
    render(<SearchIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    render(<SearchIcon className="custom-class" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});

describe('ImagePlaceholderIcon', () => {
  it('renders with default props', () => {
    render(<ImagePlaceholderIcon />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className', () => {
    render(<ImagePlaceholderIcon className="custom-class" />);
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
