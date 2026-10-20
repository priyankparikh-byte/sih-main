import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = AlertCircle,
  title = "No data found",
  description = "No matching records were found for the selected filters or query.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-industrial-900/40 border border-dashed border-industrial-700/60">
      <div className="p-3.5 rounded-full bg-industrial-800 text-cyan-400 mb-3 border border-industrial-700">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm mt-1">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 rounded-lg hover:bg-cyan-900/60 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
