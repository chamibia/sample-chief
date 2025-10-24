import { useMemo } from 'react';
import { events } from '@/data/events';

export function useProjectsListingData() {
  // Calculate max row needed for grid-rows-N (memoized for performance)
  const maxRow = useMemo(() => {
    return events.reduce((max, event) => {
      const rowStart = event.rowStart ? parseInt(event.rowStart.replace('row-start-', ''), 10) : 1;
      const rowSpan = event.gridSpan ? parseInt(event.gridSpan.replace('row-span-', '').split(' ')[0], 10) : 1;
      return Math.max(max, rowStart + rowSpan - 1);
    }, 1);
  }, []);
  const gridRowsClass = `grid-rows-${maxRow}`;

  // Slices for mobile layout
  const first = events[0];
  const secondAndThird = events.slice(1, 3);
  const rest = events.slice(3);

  return {
    events,
    gridRowsClass,
    first,
    secondAndThird,
    rest,
  };
}
