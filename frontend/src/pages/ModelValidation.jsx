import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Flame,
  Zap
} from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';
import ModelComparisonChart from '../components/charts/ModelComparisonChart';
import { modelBenchmarkData } from '../data/mockData';

export const ModelValidation = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            Model Benchmarks & Validation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Empirical evaluation against NASA C-MAPSS FD001 test sets using RMSE, MAE, and NASA Asymmetric Scoring.
          </p>
        </div>

        <Badge variant="cyan" size="sm">
          Active: Dilated TCN
        </Badge>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="TCN Benchmark RMSE"
          value="11.42"
          subvalue="Cycles Error"
          change="-1.45 vs LSTM"
          changeType="positive"
          icon={CheckCircle2}
          variant="cyan"
        />
        <MetricCard
          title="Mean Absolute Error"
          value="8.65"
          subvalue="MAE Cycles"
          change="Optimal"
          changeType="positive"
          icon={TrendingUp}
          variant="healthy"
        />
        <MetricCard
          title="NASA Asymmetric Score"
          value="248.6"
          subvalue="Exponential Penalty"
          change="-63.8 vs LSTM"
          changeType="positive"
          icon={Flame}
          variant="healthy"
        />
        <MetricCard
          title="P99 Inference Latency"
          value="4.8 ms"
          subvalue="Sub-second Scoring"
          change="Real-time"
          changeType="positive"
          icon={Zap}
          variant="cyan"
        />
      </div>

      {/* Model Comparison Chart & Model Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card
            title="Multi-Model Performance Comparison"
            subtitle="Benchmark metrics evaluated across test engines (lower values represent higher accuracy)"
          >
            <ModelComparisonChart />
          </Card>
        </div>

        <div>
          <Card
            title="Active Model Architecture"
            subtitle="Dilated Temporal Convolutional Network"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <span className="font-bold text-cyan-400 block mb-1">Dilated TCN v2.3</span>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  1D causal convolutions with exponentially growing dilation factors (1, 2, 4, 8) preventing recurrent gradient vanishing.
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-3">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Temporal Window</span>
                  <span className="text-slate-200 font-semibold">30 Flight Cycles</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Receptive Field</span>
                  <span className="text-slate-200 font-semibold">32 Cycles</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">RUL Target Clipping</span>
                  <span className="text-cyan-400 font-semibold">Rmax=125 Cycles</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Inference Runtime</span>
                  <span className="text-emerald-400 font-semibold">TorchScript JIT</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Benchmark Table */}
      <Card
        title="Prognostic Model Benchmark Suite"
        subtitle="Evaluation comparison against NASA C-MAPSS FD001 holdout test sets"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="pb-3 px-4">Model Architecture</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 px-4">RMSE</th>
                <th className="pb-3 px-4">MAE</th>
                <th className="pb-3 px-4">R²</th>
                <th className="pb-3 px-4">NASA Score</th>
                <th className="pb-3 px-4">Inference Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {modelBenchmarkData.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-slate-100">{m.model}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        m.status.includes('ACTIVE')
                          ? 'healthy'
                          : m.status.includes('SHADOW')
                          ? 'purple'
                          : 'cyan'
                      }
                      size="sm"
                    >
                      {m.status.split(' ')[0]}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">{m.rmse}</td>
                  <td className="py-3 px-4 text-slate-200">{m.mae}</td>
                  <td className="py-3 px-4 text-emerald-400">{m.r2}</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">{m.nasaScore}</td>
                  <td className="py-3 px-4 text-slate-300">{m.inferenceTimeMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ModelValidation;
