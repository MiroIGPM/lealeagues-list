import type { EmptyStateProps } from './types';

export const EmptyState = ({
  title = 'No results found',
  message = 'Try adjusting your search or filters',
  actionLabel = 'Clear Filters',
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12" data-testid="empty-state">
      <p className="text-lg text-gray-500">{title}</p>
      <p className="text-sm text-gray-400 mt-2">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
