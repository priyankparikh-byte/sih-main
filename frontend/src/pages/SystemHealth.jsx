import React, { useState } from 'react';
import {
  Activity,
  Server,
  Database,
  Cpu,
  Radio,
  RefreshCw,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import StatusIndicator from '../components/common/StatusIndicator';
import { systemServices } from '../data/mockData';

export const SystemHealth = () => {
  const [isProbing, setIsProbing] = useState(false);

  const handleRunHealthProbe = () => {
    setIsProbing(true);
    setTimeout(() => {
      setIsProbing(false);
    }, 600);
  };

  const getServiceIcon = (name) => {
    if (name.includes('FastAPI')) return Server;
    if (name.includes('TimescaleDB')) return Database;
    if (name.includes('Inference')) return Cpu;
    if (name.includes('Kafka')) return Radio;
    return Server;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Infrastructure & Pipeline Health
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of microservices, database hypertables, and streaming ingestion bus.
          </p>
        </div>

        <button
          onClick={handleRunHealthProbe}
          disabled={isProbing}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all flex items-center gap-2 border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProbing ? 'animate-spin text-cyan-400' : ''}`} />
          {isProbing ? 'Probing...' : 'Run Diagnostics'}
        </button>
      </div>

      {/* Global Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Overall Availability"
          value="99.98%"
          subvalue="SLA Compliance"
          change="Optimal"
          changeType="positive"
          icon={ShieldCheck}
          variant="healthy"
        />
        <MetricCard
          title="Gateway Latency"
          value="12 ms"
          subvalue="P95 FastAsync"
          change="-2ms"
          changeType="positive"
          icon={Zap}
          variant="cyan"
        />
        <MetricCard
          title="Streaming Rate"
          value="1,240"
          subvalue="Packets / Sec"
          change="Zero Loss"
          changeType="positive"
          icon={Radio}
          variant="cyan"
        />
        <MetricCard
          title="Persisted Events"
          value="4.89M"
          subvalue="Compressed Hypertables"
          change="92% Ratio"
          changeType="positive"
          icon={Database}
          variant="healthy"
        />
      </div>

      {/* 4 Core Visual Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemServices.slice(0, 4).map((service, idx) => {
          const Icon = getServiceIcon(service.name);
          return (
            <Card
              key={idx}
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{service.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{service.role}</p>
                    </div>
                  </div>
                  <StatusIndicator status={service.status} size="sm" />
                </div>
              }
            >
              <div className="grid grid-cols-3 gap-3 font-mono text-xs my-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Uptime</span>
                  <span className="text-emerald-400 font-bold">{service.uptime}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Latency</span>
                  <span className="text-cyan-400 font-bold">{service.latency}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Release</span>
                  <span className="text-slate-300 font-bold truncate block">{service.version}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>
                  {service.requestsPerMin && `Traffic: ${service.requestsPerMin} req/min`}
                  {service.recordsIndexed && `Indexed: ${service.recordsIndexed} events`}
                  {service.gpuUtilization && `GPU: ${service.gpuUtilization}`}
                  {service.activePartitions && `Partitions: ${service.activePartitions}`}
                </span>
                <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Healthy
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Ingestion Pipeline Topology */}
      <Card
        title="End-to-End Telemetry Pipeline"
        subtitle="Data flow from turbofan edge sensors through inference hypertables"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 1</span>
            <h5 className="font-bold text-white text-sm">Edge Sensors</h5>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              14 active channels: EGT, static pressure, vibration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 2</span>
            <h5 className="font-bold text-white text-sm">Kafka & FastAPI</h5>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              30-cycle rolling window feature engineering.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 3</span>
            <h5 className="font-bold text-white text-sm">Dilated TCN</h5>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              RUL prediction & TreeSHAP attributions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">STAGE 4</span>
            <h5 className="font-bold text-white text-sm">TimescaleDB</h5>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              Compressed hypertables & automated triage.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemHealth;
