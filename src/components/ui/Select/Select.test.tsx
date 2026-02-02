import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  it('renders with placeholder', () => {
    render(<Select value="" onChange={vi.fn()} options={options} placeholder="Select..." />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select value="" onChange={vi.fn()} options={options} />);
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select value="" onChange={handleChange} options={options} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } });
    expect(handleChange).toHaveBeenCalledWith('Option 2');
  });

  it('displays current value', () => {
    render(<Select value="Option 1" onChange={vi.fn()} options={options} />);
    expect(screen.getByRole('combobox')).toHaveValue('Option 1');
  });
});
