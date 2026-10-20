import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerBorder = false
}) => {
  return (
    <div
      className={`rounded-2xl bg-[#0e1524] border border-slate-800/80 shadow-sm transition-all duration-200 ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`flex items-center justify-between px-6 pt-6 pb-2 ${
            headerBorder ? 'border-b border-slate-800/80 pb-4' : ''
          }`}
        >
          <div>
            {title && (
              <h3 className="text-sm font-semibold tracking-wide text-slate-100 flex items-center gap-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
