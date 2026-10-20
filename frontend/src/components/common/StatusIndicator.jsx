import React from 'react';

export const StatusIndicator = ({ status = 'HEALTHY', showLabel = true, pulse = true, size = 'md' }) => {
  const normStatus = (status || '').toUpperCase();

  const config = {
    HEALTHY: {
      color: 'bg-emerald-400',
      pingColor: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      label: 'Healthy'
    },
    WARNING: {
      color: 'bg-amber-400',
      pingColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      label: 'Warning'
    },
    CRITICAL: {
      color: 'bg-rose-500',
      pingColor: 'bg-rose-600',
      textColor: 'text-rose-400',
      label: 'Critical'
    },
    OPERATIONAL: {
      color: 'bg-emerald-400',
      pingColor: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      label: 'Operational'
    },
    OFFLINE: {
      color: 'bg-slate-500',
      pingColor: 'bg-slate-600',
      textColor: 'text-slate-400',
      label: 'Offline'
    }
  };

  const current = config[normStatus] || {
    color: 'bg-cyan-400',
    pingColor: 'bg-cyan-500',
    textColor: 'text-cyan-400',
    label: status
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex items-center justify-center">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.pingColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${sizeClasses[size] || sizeClasses.md} ${current.color}`} />
      </span>
      {showLabel && (
        <span className={`text-xs font-mono font-medium tracking-wide uppercase ${current.textColor}`}>
          {current.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;
