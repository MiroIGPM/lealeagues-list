import { useState } from 'react';
import { ImagePlaceholderIcon } from '../Icons/Icons';
import type { ImageWithFallbackProps } from './types';

export const ImageWithFallback = (
  { src, alt, className = '' }: ImageWithFallbackProps
) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const fallbackClasses = `flex flex-col items-center justify-center
      bg-gray-100 rounded-lg ${className}`.replace(/\s+/g, ' ').trim();
    return (
      <div className={fallbackClasses}>
        <ImagePlaceholderIcon className="w-12 h-12 text-gray-400" />
        <p className="text-sm text-gray-500 mt-2 text-center">Image could not be loaded</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
};
