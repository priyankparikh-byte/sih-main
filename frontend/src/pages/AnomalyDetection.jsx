import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  Search,
  Activity,
  Check
} from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import { anomalyRecords as initialAnomalies } from '../data/mockData';

export const AnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState(initialAnomalies);
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setAnomalies(prev =>
      prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
    );
  };

  const filteredAnomalies = anomalies.filter(anom => {
    const matchesSeverity = severityFilter === 'ALL' || anom.severity === severityFilter;
    const matchesSearch =
      anom.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anom.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      anom.subsystem.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Anomaly Detection & Outlier Triage
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unsupervised Isolation Forest detection trained on nominal baseline cycles with CUSUM drift scoring.
          </p>
        </div>

        {/* Severity filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                severityFilter === sev
                  ? 'bg-slate-800 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Active Anomalies"
          value={anomalies.filter(a => a.status !== 'RESOLVED').length}
          subvalue="Pending Triage"
          change="+1 this hr"
          changeType="negative"
          icon={AlertOctagon}
          variant="critical"
        />
        <MetricCard
          title="Mean Anomaly Score"
          value="0.74"
          subvalue="Range [0.0 - 1.0]"
          change="Elevated"
          changeType="negative"
          icon={Activity}
          variant="warning"
        />
        <MetricCard
          title="False Alert Rate"
          value="1.8%"
          subvalue="Validation Set"
          change="-0.4%"
          changeType="positive"
          icon={ShieldCheck}
          variant="healthy"
        />
        <MetricCard
          title="Detection Lead Time"
          value="24.5"
          subvalue="Cycles Before EOL"
          change="Proactive"
          changeType="positive"
          icon={Activity}
          variant="cyan"
        />
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter anomalies by ID, Engine (ENG-103), Subsystem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0e1524] text-slate-200 text-xs font-mono rounded-xl border border-slate-800 pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Anomaly Table */}
      <Card headerBorder={false} className="p-0 overflow-hidden">
        {filteredAnomalies.length === 0 ? (
          <EmptyState
            title="No Outliers Detected"
            description={`No anomalies match the current filter.`}
            actionLabel="Reset Filter"
            onAction={() => {
              setSeverityFilter('ALL');
              setSearchTerm('');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-6">Anomaly & Time</th>
                  <th className="py-3 px-6">Severity</th>
                  <th className="py-3 px-6">Engine & Component</th>
                  <th className="py-3 px-6">Anomaly Score</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAnomalies.map((anom) => (
                  <tr key={anom.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-100">{anom.id}</div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">{anom.timestamp}</div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={
                          anom.severity === 'CRITICAL'
                            ? 'critical'
                            : anom.severity === 'HIGH'
                            ? 'warning'
                            : 'cyan'
                        }
                        size="sm"
                      >
                        {anom.severity}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-cyan-400">{anom.machineId}</div>
                      <div className="text-[11px] text-slate-300 font-sans mt-0.5">{anom.subsystem}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              anom.score > 0.85
                                ? 'bg-rose-500'
                                : anom.score > 0.6
                                ? 'bg-amber-400'
                                : 'bg-cyan-400'
                            }`}
                            style={{ width: `${anom.score * 100}%` }}
                          />
                        </div>
                        <span className="text-slate-300 font-bold">{anom.score.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          anom.status === 'INVESTIGATING'
                            ? 'bg-rose-500/10 text-rose-300'
                            : anom.status === 'ACKNOWLEDGED'
                            ? 'bg-amber-500/10 text-amber-300'
                            : 'bg-emerald-500/10 text-emerald-300'
                        }`}
                      >
                        {anom.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {anom.status === 'INVESTIGATING' ? (
                        <button
                          onClick={() => handleStatusChange(anom.id, 'ACKNOWLEDGED')}
                          className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700/80 transition-colors"
                        >
                          Acknowledge
                        </button>
                      ) : anom.status === 'ACKNOWLEDGED' ? (
                        <button
                          onClick={() => handleStatusChange(anom.id, 'RESOLVED')}
                          className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors inline-flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Resolve
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnomalyDetection;
