import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { telemetryHistory } from '../../data/mockData';

export const TelemetryChart = ({ selectedAssetId = 'ENG-103' }) => {
  const [activeMetric, setActiveMetric] = useState('all');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0e1524] border border-slate-700 p-3 rounded-xl shadow-xl text-xs font-mono">
          <p className="text-cyan-400 font-semibold mb-1">Cycle #{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
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
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-xs text-slate-400 font-mono">
          Engine <span className="text-cyan-400 font-semibold">{selectedAssetId}</span> Telemetry
        </span>
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveMetric('all')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              activeMetric === 'all'
                ? 'bg-slate-800 text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveMetric('temp')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              activeMetric === 'temp'
                ? 'bg-slate-800 text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Temp
          </button>
          <button
            onClick={() => setActiveMetric('pressure')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              activeMetric === 'pressure'
                ? 'bg-slate-800 text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pressure
          </button>
          <button
            onClick={() => setActiveMetric('vibration')}
            className={`px-3 py-1 rounded-lg transition-colors font-mono ${
              activeMetric === 'vibration'
                ? 'bg-slate-800 text-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vibration
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={telemetryHistory} margin={{ top: 10, right: 15, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
            <XAxis
              dataKey="cycle"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(val) => `C-${val}`}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'monospace' }} />

            {(activeMetric === 'all' || activeMetric === 'temp') && (
              <Line
                type="monotone"
                dataKey="temp_lpc"
                name="LPC Temp (s_3)"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
              />
            )}

            {(activeMetric === 'all' || activeMetric === 'pressure') && (
              <Line
                type="monotone"
                dataKey="pressure_static"
                name="HPC Pressure (s_11)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            )}

            {(activeMetric === 'all' || activeMetric === 'vibration') && (
              <Line
                type="monotone"
                dataKey="vibration"
                name="Vibration (s_9)"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryChart;
