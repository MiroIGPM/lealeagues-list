import type { CardProps } from './types';

export const Card = ({
  children,
  onClick,
  testId,
}: CardProps) => {
  const baseStyles = 'p-4 border border-gray-200 rounded-lg bg-white hover:border-blue-500 hover:shadow-md cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500';
  return (
    <div
      role='button'
      onClick={onClick}
      className={`${baseStyles}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
};
