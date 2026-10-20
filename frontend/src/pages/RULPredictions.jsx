import React, { useState } from 'react';
import {
  Clock,
  TrendingDown,
  AlertOctagon,
  Flame,
  Layers,
  Wrench
} from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';
import RULPredictionChart from '../components/charts/RULPredictionChart';
import { assetList, rulHistoricalCurve } from '../data/mockData';

export const RULPredictions = () => {
  const [selectedEngineId, setSelectedEngineId] = useState('ENG-103');
  const selectedEngine = assetList.find((a) => a.id === selectedEngineId) || assetList[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Remaining Useful Life (RUL) Prognostics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Piecewise-linear RUL estimation trained with Dilated TCN & LSTM architectures.
          </p>
        </div>

        {/* Engine selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Engine:</span>
          <select
            value={selectedEngineId}
            onChange={(e) => setSelectedEngineId(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs font-mono font-medium rounded-xl border border-slate-700/80 px-3 py-2 focus:outline-none focus:border-cyan-400"
          >
            {assetList.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.id} - RUL: {asset.rul} cycles ({asset.healthStatus})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RUL KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Fleet Average RUL"
          value="76.4"
          subvalue="Flight Cycles"
          change="+4.1%"
          changeType="positive"
          icon={Clock}
          variant="cyan"
        />
        <MetricCard
          title="Critical Unit RUL"
          value="8"
          subvalue="ENG-105 Remaining"
          change="Urgent"
          changeType="negative"
          icon={AlertOctagon}
          variant="critical"
        />
        <MetricCard
          title="NASA Penalty Score"
          value="248.6"
          subvalue="Benchmark Asymmetric"
          change="Optimal"
          changeType="positive"
          icon={Flame}
          variant="healthy"
        />
        <MetricCard
          title="Confidence Band"
          value={`${selectedEngine.rulConfidence}%`}
          subvalue="P95 Interval"
          change="Stable"
          changeType="positive"
          icon={Layers}
          variant="cyan"
        />
      </div>

      {/* Main RUL Curve & Prognosis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card
            title={`RUL Degradation Trajectory: ${selectedEngine.id}`}
            subtitle="Actual vs Predicted Remaining Flight Cycles with 95% Confidence Bounds"
            action={
              <Badge
                variant={selectedEngine.rul < 20 ? 'critical' : selectedEngine.rul < 50 ? 'warning' : 'healthy'}
                size="sm"
              >
                {selectedEngine.rul} CYCLES LEFT
              </Badge>
            }
          >
            <RULPredictionChart engineId={selectedEngineId} />
          </Card>
        </div>

        <div>
          <Card
            title="Maintenance Prognosis"
            subtitle={`Actionable guidance for ${selectedEngine.id}`}
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 font-mono">Current Status</span>
                  <StatusIndicator status={selectedEngine.healthStatus} size="sm" />
                </div>
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-3xl font-bold text-white">{selectedEngine.rul}</span>
                  <span className="text-xs text-slate-400">Cycles to EOL</span>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  selectedEngine.rul < 20
                    ? 'bg-rose-500/10 border-rose-500/30'
                    : selectedEngine.rul < 50
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}
              >
                <h4 className="text-xs font-bold font-mono text-slate-200 mb-1">
                  {selectedEngine.rul < 20 ? 'PRIORITY WORK ORDER' : 'NOMINAL INSPECTION SCHEDULE'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedEngine.rul < 20
                    ? `Engine ${selectedEngine.id} exhibits accelerating degradation. Ground unit before flight cycle #${selectedEngine.currentCycle + selectedEngine.rul}.`
                    : `Engine is operating stably within tolerance. Surveillance focused on ${selectedEngine.primaryRisk}.`}
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-mono pt-2">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Accumulated Cycles</span>
                  <span className="text-slate-200 font-semibold">{selectedEngine.currentCycle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Health Index</span>
                  <span className="text-cyan-400 font-semibold">{(selectedEngine.healthIndex * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Vibration Level</span>
                  <span className="text-slate-200 font-semibold">{selectedEngine.vibrationLevel}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Cycle Audit Table */}
      <Card
        title="Cycle-by-Cycle Prediction Audit"
        subtitle="Verification of predicted RUL against NASA ground truth benchmarks"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="pb-3 px-4">Flight Cycle</th>
                <th className="pb-3 px-4">Ground Truth</th>
                <th className="pb-3 px-4">TCN Predicted</th>
                <th className="pb-3 px-4">Prediction Error</th>
                <th className="pb-3 px-4">Degradation Phase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rulHistoricalCurve.map((row) => {
                const error = row.predictedRUL - row.actualRUL;
                return (
                  <tr key={row.cycle} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-200">Cycle #{row.cycle}</td>
                    <td className="py-3 px-4 text-slate-400">{row.actualRUL} cycles</td>
                    <td className="py-3 px-4 font-semibold text-cyan-400">{row.predictedRUL} cycles</td>
                    <td className="py-3 px-4">
                      <span className={error > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                        {error >= 0 ? `+${error}` : error}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={row.actualRUL < 20 ? 'critical' : row.actualRUL < 60 ? 'warning' : 'healthy'}
                        size="sm"
                      >
                        {row.actualRUL < 20 ? 'RAPID RUNOUT' : row.actualRUL < 60 ? 'ACCELERATING' : 'STEADY STATE'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RULPredictions;
