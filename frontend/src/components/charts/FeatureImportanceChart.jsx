import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { shapGlobalImportance } from '../../data/mockData';

export const FeatureImportanceChart = ({ data = shapGlobalImportance }) => {
  const getBarColor = (category) => {
    switch (category) {
      case 'Pressure': return '#06b6d4'; // Cyan
      case 'Temperature': return '#f43f5e'; // Rose
      case 'Fuel & Power': return '#f59e0b'; // Amber
      case 'Rotational Dynamics': return '#8b5cf6'; // Purple
      default: return '#3b82f6';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-industrial-900 border border-industrial-700 p-3 rounded-lg shadow-xl text-xs max-w-xs font-mono">
          <p className="font-bold text-slate-100">{item.feature}</p>
          <div className="flex justify-between my-1">
            <span className="text-slate-400">SHAP Importance:</span>
            <span className="text-cyan-400 font-bold">{(item.importance * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-slate-400">Subsystem:</span>
            <span className="text-slate-200">{item.category}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 border-t border-industrial-800 pt-1 leading-normal font-sans">
            {item.description}
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
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis
              type="number"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke="#64748b"
              tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }}
              width={160}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend / Category tags */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#06b6d4]" /> Pressure
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#f43f5e]" /> Temperature
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" /> Fuel & Power
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#8b5cf6]" /> Rotational Dynamics
        </span>
      </div>
    </div>
  );
};

export default FeatureImportanceChart;
