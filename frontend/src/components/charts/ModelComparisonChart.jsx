import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const comparisonMetrics = [
  { metric: 'RMSE (lower is better)', TCN: 11.42, LSTM: 12.87, XGBoost: 14.15 },
  { metric: 'MAE (lower is better)', TCN: 8.65, LSTM: 9.34, XGBoost: 10.72 },
  { metric: 'NASA Score (/20)', TCN: 12.43, LSTM: 15.62, XGBoost: 24.45 },
  { metric: 'Latency ms (lower is better)', TCN: 4.8, LSTM: 14.2, XGBoost: 1.2 }
];

export const ModelComparisonChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-industrial-900 border border-industrial-700 p-3 rounded-lg shadow-xl text-xs font-mono">
          <p className="text-cyan-400 font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={`entry-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-bold text-slate-100">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonMetrics} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
            <XAxis
              dataKey="metric"
              stroke="#64748b"
              tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'monospace' }} />

            <Bar dataKey="TCN" name="Dilated TCN (Active)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="LSTM" name="PyTorch LSTM" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="XGBoost" name="XGBoost Regressor" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ModelComparisonChart;
