import React, { useState } from 'react';
import {
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  Cpu
} from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import FeatureImportanceChart from '../components/charts/FeatureImportanceChart';
import {
  shapGlobalImportance,
  shapWaterfallENG103,
  assetList
} from '../data/mockData';

export const Explainability = () => {
  const [selectedEngineId, setSelectedEngineId] = useState('ENG-103');
  const engine = assetList.find(a => a.id === selectedEngineId) || assetList[2];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            TreeSHAP Feature Explainability
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Isolating exact physical sensors driving RUL degradation and early failure warnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Engine:</span>
          <select
            value={selectedEngineId}
            onChange={(e) => setSelectedEngineId(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-mono font-medium rounded-xl border border-slate-700/80 px-3 py-1.5 focus:outline-none focus:border-cyan-400"
          >
            {assetList.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} ({a.healthStatus} - RUL {a.rul}c)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Top Degradation Driver"
          value="s_11"
          subvalue="HPC Static Pressure (28.4%)"
          change="Compressor Wear"
          changeType="negative"
          icon={Layers}
          variant="critical"
        />
        <MetricCard
          title="Secondary Driver"
          value="s_4"
          subvalue="LPT Coolant Bleed (22.1%)"
          change="Thermal Creep"
          changeType="negative"
          icon={Layers}
          variant="warning"
        />
        <MetricCard
          title="Attribution Method"
          value="TreeSHAP"
          subvalue="Exact Local Additivity"
          change="Axiomatic"
          changeType="positive"
          icon={Cpu}
          variant="cyan"
        />
        <MetricCard
          title="Active Channels"
          value="14"
          subvalue="7 Invariant Filtered"
          change="NASA C-MAPSS"
          changeType="neutral"
          icon={Cpu}
          variant="cyan"
        />
      </div>

      {/* Main Charts: Global Importance & Local Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="Global Sensor Feature Importance"
          subtitle="Mean absolute TreeSHAP values across all flight test cycles"
        >
          <FeatureImportanceChart data={shapGlobalImportance} />
        </Card>

        <Card
          title={`Local RUL Waterfall: ${engine.id}`}
          subtitle={`Decomposing nominal 125 cycle baseline down to predicted ${engine.rul} cycles`}
          action={
            <Badge variant={engine.rul < 20 ? 'critical' : 'warning'} size="sm">
              RUL: {engine.rul} Cycles
            </Badge>
          }
        >
          <div className="space-y-2.5 font-mono text-xs">
            {shapWaterfallENG103.map((step, idx) => {
              const isBase = step.type === 'base';
              const isTotal = step.type === 'total';
              const isNegative = step.type === 'negative';
              const isPositive = step.type === 'positive';

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isTotal
                      ? 'bg-cyan-500/10 border-cyan-500/40 font-bold'
                      : isBase
                      ? 'bg-slate-900 border-slate-800'
                      : isNegative
                      ? 'bg-rose-500/10 border-rose-500/20'
                      : 'bg-emerald-500/10 border-emerald-500/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isNegative ? (
                      <ArrowDownRight className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : isPositive ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                    )}
                    <span className="text-slate-200">{step.name}</span>
                  </div>

                  <span
                    className={`font-mono font-bold ${
                      isTotal
                        ? 'text-cyan-400 text-sm'
                        : isBase
                        ? 'text-slate-200'
                        : isNegative
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {isNegative ? `${step.impact} cycles` : isPositive ? `+${step.impact} cycles` : `${step.impact} cycles`}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sensor Catalog */}
      <Card
        title="Physical Sensor Attribution Catalog"
        subtitle="Thermodynamic interpretation of primary degrading telemetry channels"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="pb-3 px-4">Sensor Code</th>
                <th className="pb-3 px-4">Telemetry Channel</th>
                <th className="pb-3 px-4">Subsystem</th>
                <th className="pb-3 px-4">SHAP Weight</th>
                <th className="pb-3 px-4 font-sans">Physical Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {shapGlobalImportance.slice(0, 5).map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-cyan-400">{item.feature.split(' ')[0]}</td>
                  <td className="py-3 px-4 text-slate-200 font-sans">{item.feature.split('(')[1]?.replace(')', '') || item.feature}</td>
                  <td className="py-3 px-4">
                    <Badge variant="cyan" size="sm">{item.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-bold">
                    {(item.importance * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans">
                    {item.description}
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

export default Explainability;
