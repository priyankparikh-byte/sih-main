import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Cpu,
  X,
  Clock,
  Layers,
  AlertTriangle
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusIndicator from '../components/common/StatusIndicator';
import EmptyState from '../components/common/EmptyState';
import { assetList } from '../data/mockData';

export const AssetMonitoring = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredAssets = assetList.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || asset.healthStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Turbofan Fleet Directory
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time condition monitoring, operating cycles, and RUL projections across all active engines.
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
          {['ALL', 'HEALTHY', 'WARNING', 'CRITICAL'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === status
                  ? 'bg-slate-800 text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter engines by ID, Model, Location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0e1524] text-slate-200 text-xs font-mono rounded-xl border border-slate-800 pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Assets Table */}
      <Card headerBorder={false} className="p-0 overflow-hidden">
        {filteredAssets.length === 0 ? (
          <EmptyState
            title="No Matching Engines Found"
            description={`No engines match "${searchTerm}".`}
            actionLabel="Reset Search"
            onAction={() => {
              setSearchTerm('');
              setStatusFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-6">Turbofan Unit</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Health Condition</th>
                  <th className="py-3 px-6">RUL Estimate</th>
                  <th className="py-3 px-6">Last Reported</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                  >
                    {/* Compound Unit ID & Model */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {asset.id}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                        {asset.model} • Cycle #{asset.currentCycle}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-slate-300 font-sans">{asset.location}</td>

                    {/* Health Status & Indicator */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <StatusIndicator status={asset.healthStatus} size="sm" />
                        <span className="text-slate-400 text-[11px]">
                          ({(asset.healthIndex * 100).toFixed(0)}% HI)
                        </span>
                      </div>
                    </td>

                    {/* RUL */}
                    <td className="py-4 px-6">
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

                    {/* Last Update */}
                    <td className="py-4 px-6 text-slate-400">{asset.lastUpdate}</td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAsset(asset);
                        }}
                        className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Inspection Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e1524] border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {selectedAsset.id} ({selectedAsset.model})
                  <StatusIndicator status={selectedAsset.healthStatus} size="sm" />
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedAsset.location}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Remaining RUL</span>
                <span className={`text-base font-bold ${selectedAsset.rul < 20 ? 'text-rose-400' : 'text-cyan-400'}`}>
                  {selectedAsset.rul} Cycles
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Health Index</span>
                <span className="text-base font-bold text-slate-200">
                  {(selectedAsset.healthIndex * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Exhaust Temp</span>
                <span className="text-base font-bold text-amber-400">{selectedAsset.exhaustTemp}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Vibration</span>
                <span className="text-base font-bold text-purple-400">{selectedAsset.vibrationLevel}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-cyan-400" />
                Prognostic Finding
              </h4>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedAsset.primaryRisk}. Operating at flight cycle #{selectedAsset.currentCycle}.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedAsset(null);
                  navigate('/rul');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                View RUL Curve
              </button>
              <button
                onClick={() => {
                  setSelectedAsset(null);
                  navigate('/explainability');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                SHAP Explainability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetMonitoring;
