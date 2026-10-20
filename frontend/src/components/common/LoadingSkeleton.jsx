import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  if (type === 'table') {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-10 bg-industrial-800 rounded-lg w-full" />
        {[...Array(count)].map((_, i) => (
          <div key={i} className="h-12 bg-industrial-850 rounded-lg w-full border border-industrial-800/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="h-32 bg-industrial-850 rounded-xl border border-industrial-800/80 p-5">
          <div className="h-4 bg-industrial-700 rounded w-1/2 mb-4" />
          <div className="h-8 bg-industrial-700/60 rounded w-3/4 mb-2" />
          <div className="h-3 bg-industrial-800 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
