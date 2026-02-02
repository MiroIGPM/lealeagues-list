import { useRef, useMemo, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { VirtualizedListProps, ResponsiveColumns } from './types';

const DEFAULT_OVERSCAN = 5;
const DEFAULT_CONTAINER_HEIGHT = 'h-[calc(100vh-280px)]';
const DEFAULT_GRID_CLASS = 'grid gap-4 pb-4';

const DEFAULT_COLUMNS: ResponsiveColumns = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  xl: 4,
  breakpoints: {
    tablet: 768,
    desktop: 1024,
    xl: 1280,
  },
};

const useResponsiveColumns = (config: ResponsiveColumns) => {
  const breakpoints = config.breakpoints ?? DEFAULT_COLUMNS.breakpoints!;
  const xlColumns = config.xl ?? config.desktop;
  const xlBreakpoint = breakpoints.xl ?? 1280;

  const getColumnCount = () => {
    if (typeof window === 'undefined') return config.mobile;
    if (window.innerWidth >= xlBreakpoint) return xlColumns;
    if (window.innerWidth >= breakpoints.desktop) return config.desktop;
    if (window.innerWidth >= breakpoints.tablet) return config.tablet;
    return config.mobile;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [config]);

  return columnCount;
};

const getGridColsClass = (columns: number) => {
  const colsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };
  return colsMap[columns] ?? `grid-cols-${columns}`;
};

export const VirtualizedList = <T,>({
  items,
  renderItem,
  keyExtractor,
  estimatedRowHeight,
  columns = DEFAULT_COLUMNS,
  overscan = DEFAULT_OVERSCAN,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  gridClassName = DEFAULT_GRID_CLASS,
}: VirtualizedListProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const columnCount = useResponsiveColumns(columns);

  const rows = useMemo(() => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += columnCount) {
      result.push(items.slice(i, i + columnCount));
    }
    return result;
  }, [items, columnCount]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan,
    measureElement: (element) => element.getBoundingClientRect().height,
  });

  const gridColsClass = getGridColsClass(columnCount);

  return (
    <div
      ref={parentRef}
      className={`${containerHeight} overflow-auto`}
      data-testid="virtualized-list-container"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={`row-${virtualRow.index}`}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className={`${gridClassName} ${gridColsClass}`}
            >
              {row.map((item, itemIndex) => {
                const globalIndex = virtualRow.index * columnCount + itemIndex;
                return (
                  <div key={keyExtractor(item)}>
                    {renderItem(item, globalIndex)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
