import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  CheckCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  Activity,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';
import TelemetryChart from '../components/charts/TelemetryChart';
import { fleetSummary, assetList, recentAlerts } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState('ENG-103');

  return (
    <div className="space-y-8">
      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Monitored Engines"
          value={fleetSummary.totalAssets}
          subvalue="Active Units"
          change="+2"
          changeType="neutral"
          icon={Cpu}
          variant="cyan"
          onClick={() => navigate('/assets')}
        />
        <MetricCard
          title="Healthy Engines"
          value={fleetSummary.healthyAssets}
          subvalue="Nominal"
          change="Optimal"
          changeType="positive"
          icon={CheckCircle}
          variant="healthy"
          onClick={() => navigate('/assets')}
        />
        <MetricCard
          title="Critical Engines"
          value={fleetSummary.criticalAssets}
          subvalue="RUL < 20 Cycles"
          change="Action Req."
          changeType="negative"
          icon={AlertOctagon}
          variant="critical"
          onClick={() => navigate('/rul')}
        />
        <MetricCard
          title="Active Anomalies"
          value={fleetSummary.activeAnomalies}
          subvalue="Detected Outliers"
          change="+1 this hr"
          changeType="negative"
          icon={AlertTriangle}
          variant="warning"
          onClick={() => navigate('/anomalies')}
        />
      </div>

      {/* 2. Telemetry Stream & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Telemetry Chart (2 cols) */}
        <div className="lg:col-span-2">
          <Card
            title="Real-Time Telemetry Stream"
            subtitle="Sensor degradation trends across operational flight cycles"
            action={
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="bg-slate-900 text-slate-200 text-xs font-mono rounded-xl border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                {assetList.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.id} ({asset.model})
                  </option>
                ))}
              </select>
            }
          >
            <TelemetryChart selectedAssetId={selectedAsset} />
          </Card>
        </div>

        {/* Recent Alerts Feed (1 col) */}
        <div>
          <Card
            title="Recent Fleet Alerts"
            subtitle="Automated outlier detections and RUL warnings"
            action={
              <button
                onClick={() => navigate('/anomalies')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="space-y-3.5">
              {recentAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-slate-200">
                      {alert.machine}
                    </span>
                    <Badge
                      variant={alert.level === 'critical' ? 'critical' : alert.level === 'warning' ? 'warning' : 'healthy'}
                      size="sm"
                    >
                      {alert.level.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-medium text-slate-300">{alert.type}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Priority Turbofan Watchlist */}
      <Card
        title="Priority Turbofan Watchlist"
        subtitle="Assets requiring continuous monitoring or scheduled maintenance"
        action={
          <button
            onClick={() => navigate('/assets')}
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>All Assets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="pb-3 px-4">Engine ID</th>
                <th className="pb-3 px-4">Model</th>
                <th className="pb-3 px-4">Health Status</th>
                <th className="pb-3 px-4">Remaining Life</th>
                <th className="pb-3 px-4">Primary Risk</th>
                <th className="pb-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {assetList.slice(0, 5).map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => navigate('/assets')}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {asset.id}
                  </td>
                  <td className="py-4 px-4 text-slate-400">{asset.model}</td>
                  <td className="py-4 px-4">
                    <StatusIndicator status={asset.healthStatus} size="sm" />
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`font-bold ${
                        asset.rul < 20
                          ? 'text-rose-400'
                          : asset.rul < 50
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {asset.rul} cycles
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-sans">{asset.primaryRisk}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-cyan-400 text-xs hover:underline">Inspect &rarr;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
