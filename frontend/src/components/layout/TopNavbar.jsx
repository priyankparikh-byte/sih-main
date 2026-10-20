import React from 'react';
import { useLocation } from 'react-router-dom';
import { RefreshCw, Radio } from 'lucide-react';

export const TopNavbar = ({ onRefresh, isRefreshing = false }) => {
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/': return 'Fleet Overview & Telemetry';
      case '/assets': return 'Turbofan Fleet Directory';
      case '/rul': return 'RUL Prognostics & Life Prediction';
      case '/anomalies': return 'Real-Time Anomaly Triage';
      case '/explainability': return 'TreeSHAP Feature Explainability';
      case '/models': return 'Model Benchmarks & Validation';
      case '/health': return 'Pipeline & System Health';
      default: return 'Predictive Maintenance';
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between">
      <div>
        <h1 className="text-base font-semibold text-slate-100 tracking-tight">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Stream badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-slate-400">Stream Online</span>
        </div>

        {/* Sync Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors flex items-center gap-1.5 text-xs"
          title="Refresh telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          <span className="hidden md:inline">Sync</span>
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
