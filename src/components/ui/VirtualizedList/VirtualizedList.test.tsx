import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VirtualizedList } from './VirtualizedList';

interface TestItem {
  id: string;
  name: string;
}

const mockItems: TestItem[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];

describe('VirtualizedList', () => {
  it('renders the container', () => {
    render(
      <VirtualizedList
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={(item) => item.id}
        estimatedRowHeight={100}
      />
    );
    expect(screen.getByTestId('virtualized-list-container')).toBeInTheDocument();
  });

  it('applies custom container height', () => {
    render(
      <VirtualizedList
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={(item) => item.id}
        estimatedRowHeight={100}
        containerHeight="h-96"
      />
    );
    const container = screen.getByTestId('virtualized-list-container');
    expect(container).toHaveClass('h-96');
  });

  it('renders empty list without errors', () => {
    render(
      <VirtualizedList
        items={[]}
        renderItem={(item: TestItem) => <div>{item.name}</div>}
        keyExtractor={(item: TestItem) => item.id}
        estimatedRowHeight={100}
      />
    );
    expect(screen.getByTestId('virtualized-list-container')).toBeInTheDocument();
  });

  it('accepts custom columns configuration', () => {
    render(
      <VirtualizedList
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        keyExtractor={(item) => item.id}
        estimatedRowHeight={100}
        columns={{ mobile: 1, tablet: 2, desktop: 4 }}
      />
    );
    expect(screen.getByTestId('virtualized-list-container')).toBeInTheDocument();
  });
});
