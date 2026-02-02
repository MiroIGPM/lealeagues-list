import type { ErrorStateProps } from './types';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred',
  actionLabel = 'Try Again',
  onAction,
}: ErrorStateProps) => {
  return (
    <div className="p-6 text-center" role="alert" data-testid="error-state">
      <h2 className="text-xl font-semibold text-red-600 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
