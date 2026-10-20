import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { rulHistoricalCurve } from '../../data/mockData';

export const RULPredictionChart = ({ engineId = 'ENG-103' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-industrial-900/95 border border-industrial-700 p-3 rounded-lg shadow-xl text-xs font-mono">
          <p className="text-cyan-400 font-semibold mb-1">Flight Cycle #{label}</p>
          {payload.map((entry, index) => (
            <div key={`rul-tip-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-bold text-slate-100">{entry.value} cycles</span>
            </div>
          ))}
          <p className="text-[10px] text-slate-400 mt-1 border-t border-industrial-800 pt-1">
            Status: {label > 200 ? 'Critical Degradation' : 'Stable'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rulHistoricalCurve} margin={{ top: 15, right: 25, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rulConfidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
            <XAxis
              dataKey="cycle"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `Cycle ${v}`}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              domain={[0, 140]}
              label={{ value: 'RUL (Cycles)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11, dy: 40 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '11px', fontFamily: 'monospace' }} />

            {/* Threshold Line at 20 cycles */}
            <ReferenceLine
              y={20}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{ value: 'CRITICAL LIMIT (20 CYCLES)', fill: '#ef4444', fontSize: 10, position: 'top' }}
            />

            {/* Confidence Area */}
            <Area
              type="monotone"
              dataKey="upperConfidence"
              stroke="none"
              fill="url(#rulConfidenceBand)"
              name="95% CI Upper"
            />

            {/* Ground Truth RUL */}
            <Line
              type="monotone"
              dataKey="actualRUL"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="4 4"
              name="Ground Truth RUL"
              dot={false}
            />

            {/* Predicted RUL */}
            <Line
              type="monotone"
              dataKey="predictedRUL"
              stroke="#06b6d4"
              strokeWidth={3}
              name="Dilated TCN Predicted RUL"
              dot={{ r: 4, fill: '#06b6d4' }}
              activeDot={{ r: 7, fill: '#22d3ee' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RULPredictionChart;
