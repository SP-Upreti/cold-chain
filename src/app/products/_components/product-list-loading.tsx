import React from 'react';

interface ProductListLoadingProps {
  limit?: number;
}

export default function ProductListLoading({ limit = 10 }: ProductListLoadingProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3">
      {Array.from({ length: limit }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
        </div>
      ))}
    </div>
  );
}
