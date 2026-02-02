import type { ReactNode } from 'react';

export interface ResponsiveColumns {
  mobile: number;
  tablet: number;
  desktop: number;
  xl?: number;
  breakpoints?: {
    tablet: number;
    desktop: number;
    xl?: number;
  };
}

export interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  estimatedRowHeight: number;
  columns?: ResponsiveColumns;
  overscan?: number;
  containerHeight?: string;
  gridClassName?: string;
}
