import React from 'react';

export const MetricCard = ({
  title,
  value,
  subvalue,
  change,
  changeType = 'neutral',
  icon: Icon,
  variant = 'cyan',
  onClick
}) => {
  const iconColors = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  };

  const badgeColors = {
    positive: 'text-emerald-400 bg-emerald-500/10',
    negative: 'text-rose-400 bg-rose-500/10',
    neutral: 'text-slate-400 bg-slate-800/60'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[#0e1524] border border-slate-800/80 p-6 transition-all duration-200 hover:border-slate-700 ${
        onClick ? 'cursor-pointer hover:translate-y-[-1px]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${iconColors[variant] || iconColors.cyan}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-3xl font-bold font-mono tracking-tight text-white">
          {value}
        </span>
        {subvalue && (
          <span className="text-xs text-slate-400 font-mono">
            {subvalue}
          </span>
        )}
      </div>

      {change && (
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-medium ${
              badgeColors[changeType] || badgeColors.neutral
            }`}
          >
            {change}
          </span>
          <span className="text-[11px] text-slate-400">vs baseline</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
