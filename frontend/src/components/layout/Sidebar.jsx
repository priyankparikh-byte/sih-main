import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  Clock,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Activity,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Asset Monitoring', path: '/assets', icon: Cpu },
  { name: 'RUL Predictions', path: '/rul', icon: Clock },
  { name: 'Anomaly Detection', path: '/anomalies', icon: AlertTriangle },
  { name: 'Explainability', path: '/explainability', icon: Layers },
  { name: 'Model Validation', path: '/models', icon: CheckCircle2 },
  { name: 'System Health', path: '/health', icon: Activity },
];

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 bg-[#0a0e17] border-r border-slate-800/80 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-base tracking-wide text-white">
                Vayu<span className="text-cyan-400">Pulse</span>
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60'
                  } ${isCollapsed ? 'justify-center px-0' : ''}`
                }
                title={isCollapsed ? item.name : undefined}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Live Status */}
      <div className="p-4 border-t border-slate-800/60">
        {!isCollapsed ? (
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Live Ingest
            </span>
            <span className="font-mono text-slate-400">1.2k msg/s</span>
          </div>
        ) : (
          <div className="flex justify-center" title="Live Ingestion Active">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
