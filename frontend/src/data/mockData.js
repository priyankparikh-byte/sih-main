// Centralized Mock Data for VayuPulse Industrial AI Predictive Maintenance
// Based on NASA C-MAPSS Turbofan Engine Prognostics Architecture

export const fleetSummary = {
  totalAssets: 42,
  healthyAssets: 33,
  warningAssets: 6,
  criticalAssets: 3,
  activeAnomalies: 5,
  avgFleetRUL: 76.4,
  telemetryIngestRate: "1,240 msg/s",
  modelLatency: "14.2 ms",
  lastPipelineRun: "2026-10-20 18:02:15"
};

export const assetList = [
  {
    id: "ENG-101",
    model: "CFM-56-7B",
    location: "Bay 01 - Test Cell Alpha",
    currentCycle: 204,
    healthStatus: "HEALTHY",
    healthIndex: 0.94,
    rul: 118,
    rulConfidence: 96.2,
    primaryRisk: "Nominal Baseline",
    lastUpdate: "30s ago",
    vibrationLevel: "1.4 mm/s",
    exhaustTemp: "642 °C",
    fuelFlow: "1,420 pph"
  },
  {
    id: "ENG-102",
    model: "GE90-115B",
    location: "Aircraft N804AA - Right Pylon",
    currentCycle: 285,
    healthStatus: "WARNING",
    healthIndex: 0.61,
    rul: 42,
    rulConfidence: 89.5,
    primaryRisk: "HPC Blade Thermal Creep",
    lastUpdate: "2m ago",
    vibrationLevel: "3.8 mm/s",
    exhaustTemp: "715 °C",
    fuelFlow: "1,680 pph"
  },
  {
    id: "ENG-103",
    model: "Trent 1000",
    location: "Test Bench Beta - Rig 3",
    currentCycle: 312,
    healthStatus: "CRITICAL",
    healthIndex: 0.22,
    rul: 11,
    rulConfidence: 94.1,
    primaryRisk: "LPT Rotor Seal Degradation",
    lastUpdate: "Just now",
    vibrationLevel: "6.7 mm/s",
    exhaustTemp: "788 °C",
    fuelFlow: "1,890 pph"
  },
  {
    id: "ENG-104",
    model: "LEAP-1B",
    location: "Aircraft N302SW - Left Pylon",
    currentCycle: 142,
    healthStatus: "HEALTHY",
    healthIndex: 0.97,
    rul: 125,
    rulConfidence: 98.0,
    primaryRisk: "Nominal Baseline",
    lastUpdate: "1m ago",
    vibrationLevel: "1.1 mm/s",
    exhaustTemp: "625 °C",
    fuelFlow: "1,390 pph"
  },
  {
    id: "ENG-105",
    model: "PW4000-94",
    location: "Hangar 4 - Maintenance Dock",
    currentCycle: 298,
    healthStatus: "CRITICAL",
    healthIndex: 0.18,
    rul: 8,
    rulConfidence: 95.7,
    primaryRisk: "Static Pressure Bleed Anomaly",
    lastUpdate: "Just now",
    vibrationLevel: "7.2 mm/s",
    exhaustTemp: "804 °C",
    fuelFlow: "1,940 pph"
  },
  {
    id: "ENG-106",
    model: "GEnx-1B70",
    location: "Aircraft N787UA - Right Pylon",
    currentCycle: 190,
    healthStatus: "HEALTHY",
    healthIndex: 0.88,
    rul: 94,
    rulConfidence: 92.4,
    primaryRisk: "Nominal Baseline",
    lastUpdate: "4m ago",
    vibrationLevel: "1.6 mm/s",
    exhaustTemp: "650 °C",
    fuelFlow: "1,450 pph"
  },
  {
    id: "ENG-107",
    model: "CF34-8E5",
    location: "Flight Line Ramp 12",
    currentCycle: 240,
    healthStatus: "WARNING",
    healthIndex: 0.54,
    rul: 36,
    rulConfidence: 87.2,
    primaryRisk: "Core Speed Inconsistency",
    lastUpdate: "5m ago",
    vibrationLevel: "4.1 mm/s",
    exhaustTemp: "732 °C",
    fuelFlow: "1,710 pph"
  },
  {
    id: "ENG-108",
    model: "V2500-A5",
    location: "Hangar 2 - Overhaul Stand",
    currentCycle: 265,
    healthStatus: "CRITICAL",
    healthIndex: 0.28,
    rul: 15,
    rulConfidence: 91.8,
    primaryRisk: "Bearing Cage Micro-fracture",
    lastUpdate: "Just now",
    vibrationLevel: "6.1 mm/s",
    exhaustTemp: "772 °C",
    fuelFlow: "1,840 pph"
  }
];

export const telemetryHistory = [
  { cycle: 175, temp_lpc: 641, temp_hpc: 1580, pressure_static: 553.1, core_speed: 9051, vibration: 1.2, hi: 0.95 },
  { cycle: 180, temp_lpc: 642, temp_hpc: 1583, pressure_static: 553.4, core_speed: 9054, vibration: 1.3, hi: 0.93 },
  { cycle: 185, temp_lpc: 644, temp_hpc: 1588, pressure_static: 552.8, core_speed: 9058, vibration: 1.4, hi: 0.91 },
  { cycle: 190, temp_lpc: 648, temp_hpc: 1595, pressure_static: 551.9, core_speed: 9062, vibration: 1.7, hi: 0.88 },
  { cycle: 195, temp_lpc: 652, temp_hpc: 1604, pressure_static: 550.8, core_speed: 9070, vibration: 2.1, hi: 0.84 },
  { cycle: 200, temp_lpc: 659, temp_hpc: 1618, pressure_static: 549.2, core_speed: 9081, vibration: 2.7, hi: 0.78 },
  { cycle: 205, temp_lpc: 668, temp_hpc: 1635, pressure_static: 547.4, core_speed: 9095, vibration: 3.4, hi: 0.71 },
  { cycle: 210, temp_lpc: 679, temp_hpc: 1656, pressure_static: 545.1, core_speed: 9112, vibration: 4.2, hi: 0.63 },
  { cycle: 215, temp_lpc: 694, temp_hpc: 1682, pressure_static: 542.2, core_speed: 9135, vibration: 5.1, hi: 0.52 },
  { cycle: 220, temp_lpc: 712, temp_hpc: 1714, pressure_static: 538.5, core_speed: 9168, vibration: 6.3, hi: 0.38 },
  { cycle: 225, temp_lpc: 735, temp_hpc: 1752, pressure_static: 533.9, core_speed: 9210, vibration: 7.4, hi: 0.22 }
];

export const rulHistoricalCurve = [
  { cycle: 50, actualRUL: 125, predictedRUL: 125, upperConfidence: 125, lowerConfidence: 120 },
  { cycle: 80, actualRUL: 125, predictedRUL: 124, upperConfidence: 125, lowerConfidence: 118 },
  { cycle: 110, actualRUL: 115, predictedRUL: 117, upperConfidence: 122, lowerConfidence: 111 },
  { cycle: 140, actualRUL: 85, predictedRUL: 88, upperConfidence: 94, lowerConfidence: 81 },
  { cycle: 170, actualRUL: 55, predictedRUL: 56, upperConfidence: 61, lowerConfidence: 50 },
  { cycle: 190, actualRUL: 35, predictedRUL: 34, upperConfidence: 39, lowerConfidence: 29 },
  { cycle: 210, actualRUL: 15, predictedRUL: 14, upperConfidence: 18, lowerConfidence: 11 },
  { cycle: 225, actualRUL: 0, predictedRUL: 1, upperConfidence: 4, lowerConfidence: 0 }
];

export const anomalyRecords = [
  {
    id: "ANOM-8831",
    machineId: "ENG-103",
    timestamp: "2026-10-20 17:58:22",
    subsystem: "LPT Rotor Seal & Blade Stage 3",
    severity: "CRITICAL",
    score: 0.942,
    detectionMethod: "Isolation Forest + CUSUM Drift",
    status: "INVESTIGATING",
    metricAnomaly: "Temp Spike +48°C (3.4σ above mean)"
  },
  {
    id: "ANOM-8829",
    machineId: "ENG-105",
    timestamp: "2026-10-20 17:42:10",
    subsystem: "High Pressure Compressor (HPC)",
    severity: "CRITICAL",
    score: 0.918,
    detectionMethod: "Isolation Forest (Subspace k=14)",
    status: "ACKNOWLEDGED",
    metricAnomaly: "Static Bleed Ratio drop (-18.2%)"
  },
  {
    id: "ANOM-8815",
    machineId: "ENG-108",
    timestamp: "2026-10-20 16:30:45",
    subsystem: "Aft Bearing Roller Cage",
    severity: "HIGH",
    score: 0.785,
    detectionMethod: "Spectral Energy Kurtosis",
    status: "PENDING",
    metricAnomaly: "Vibration high freq spike 6.1 mm/s"
  },
  {
    id: "ANOM-8802",
    machineId: "ENG-102",
    timestamp: "2026-10-20 15:14:02",
    subsystem: "Fuel Metering Valve & Nozzle",
    severity: "MEDIUM",
    score: 0.634,
    detectionMethod: "Multivariate Gaussian Density",
    status: "RESOLVED",
    metricAnomaly: "Fuel Flow hunting ±45 pph"
  },
  {
    id: "ANOM-8791",
    machineId: "ENG-107",
    timestamp: "2026-10-20 13:40:19",
    subsystem: "Core Spool N2 Tachometer",
    severity: "LOW",
    score: 0.412,
    detectionMethod: "Mahalanobis Outlier Filter",
    status: "RESOLVED",
    metricAnomaly: "Transient sensor noise jitter"
  }
];

export const recentAlerts = [
  {
    id: "ALT-01",
    time: "2m ago",
    machine: "ENG-103",
    type: "Critical RUL Depletion",
    desc: "Remaining Life estimated at 11 flight cycles. Recommend immediate maintenance grounding.",
    level: "critical"
  },
  {
    id: "ALT-02",
    time: "15m ago",
    machine: "ENG-105",
    type: "HPC Static Bleed Anomaly",
    desc: "Pressure differential s_11 exceeded 3σ threshold limit for 4 consecutive cycles.",
    level: "critical"
  },
  {
    id: "ALT-03",
    time: "48m ago",
    machine: "ENG-102",
    type: "Degradation Trend Drift",
    desc: "Health Index dropped below 0.65 threshold. Cycle rate degradation accelerating.",
    level: "warning"
  },
  {
    id: "ALT-04",
    time: "2h ago",
    machine: "ENG-108",
    type: "Bearing Vibration Excursion",
    desc: "Radial sensor s_9 recorded anomalous 6.1 mm/s amplitude during high cruise setting.",
    level: "warning"
  },
  {
    id: "ALT-05",
    time: "3h ago",
    machine: "ENG-104",
    type: "Routine Inspection Completed",
    desc: "Borescope inspection signed off. Engine verified healthy at 125 cycles RUL.",
    level: "healthy"
  }
];

export const shapGlobalImportance = [
  { feature: "s_11 (HPC Static Pressure)", importance: 0.284, category: "Pressure", description: "Primary indicator of compressor fouling and aerodynamic stall resistance" },
  { feature: "s_4 (LPT Coolant Bleed)", importance: 0.221, category: "Temperature", description: "Turbine cooling air modulation tracking thermo-mechanical wear" },
  { feature: "s_12 (Fuel Flow Ratio)", importance: 0.165, category: "Fuel & Power", description: "Ratio of fuel mass flow to static pressure at HPC exit" },
  { feature: "s_9 (Physical Core Speed)", importance: 0.128, category: "Rotational Dynamics", description: "Core shaft RPM tracking internal aerodynamic drag increase" },
  { feature: "s_14 (Corrected Core Speed)", importance: 0.089, category: "Rotational Dynamics", description: "Normalized core rotational velocity corrected for ISA altitude" },
  { feature: "s_7 (HPC Outlet Pressure)", importance: 0.062, category: "Pressure", description: "Combustion chamber entry stagnation pressure" },
  { feature: "s_3 (Total Temp at LPC)", importance: 0.034, category: "Temperature", description: "Low pressure compressor exit thermal gradient" },
  { feature: "s_2 (Total Temp at Fan)", importance: 0.017, category: "Temperature", description: "Fan inlet ambient total temperature distribution" }
];

export const shapWaterfallENG103 = [
  { name: "Base Expected RUL", impact: 125.0, type: "base" },
  { name: "s_11 HPC Pressure Spike", impact: -42.5, type: "negative" },
  { name: "s_4 Coolant Temp Drift", impact: -28.3, type: "negative" },
  { name: "s_12 Fuel-Air Imbalance", impact: -21.4, type: "negative" },
  { name: "s_9 High Vibration Drag", impact: -14.6, type: "negative" },
  { name: "s_2 Fan Temp Stability", impact: +2.8, type: "positive" },
  { name: "s_14 Altitude Compensation", impact: -10.0, type: "negative" },
  { name: "Final Predicted RUL", impact: 11.0, type: "total" }
];

export const modelBenchmarkData = [
  {
    model: "Dilated TCN (Causal Conv)",
    rmse: 11.42,
    mae: 8.65,
    r2: 0.894,
    nasaScore: 248.6,
    inferenceTimeMs: 4.8,
    memoryMb: 38,
    status: "PRODUCTION ACTIVE",
    strengths: "Long temporal memory, zero recurrent gradient vanishing, sub-5ms latency."
  },
  {
    model: "PyTorch 2-Layer LSTM",
    rmse: 12.87,
    mae: 9.34,
    r2: 0.865,
    nasaScore: 312.4,
    inferenceTimeMs: 14.2,
    memoryMb: 52,
    status: "STANDBY SHADOW",
    strengths: "Captures sequential non-linear degradation trajectories well."
  },
  {
    model: "XGBoost Regressor (Baseline)",
    rmse: 14.15,
    mae: 10.72,
    r2: 0.832,
    nasaScore: 489.1,
    inferenceTimeMs: 1.2,
    memoryMb: 14,
    status: "EXPLAINABILITY ENGINE",
    strengths: "Ultra-fast execution and native TreeSHAP exact attribution support."
  }
];

export const systemServices = [
  {
    name: "FastAPI Prognostics Gateway",
    role: "Core REST & WebSocket Ingestion API",
    status: "OPERATIONAL",
    uptime: "99.98%",
    latency: "12 ms",
    version: "v2.4.1",
    endpoints: 16,
    requestsPerMin: 1420
  },
  {
    name: "TimescaleDB Hypertable Engine",
    role: "High-Throughput Time-Series Persistence",
    status: "OPERATIONAL",
    uptime: "99.99%",
    latency: "3.2 ms",
    version: "PostgreSQL 16.2 / TS 2.14",
    recordsIndexed: "4,892,100",
    compressionRatio: "92.4%"
  },
  {
    name: "TorchScript & ONNX Inference Worker",
    role: "Dilated TCN / LSTM Real-Time Scoring",
    status: "OPERATIONAL",
    uptime: "99.95%",
    latency: "4.8 ms",
    version: "PyTorch 2.3+CUDA",
    gpuUtilization: "41%",
    throughput: "850 infer/s"
  },
  {
    name: "Kafka Telemetry Streaming Bus",
    role: "Flight Sensor Ingestion & Stream Replay",
    status: "OPERATIONAL",
    uptime: "100.0%",
    latency: "1.1 ms",
    version: "Apache Kafka 3.7",
    activePartitions: 12,
    consumerLag: "0 ms"
  },
  {
    name: "TreeSHAP Attribution Service",
    role: "Real-time Feature Importance Kernel",
    status: "OPERATIONAL",
    uptime: "99.91%",
    latency: "28 ms",
    version: "SHAP 0.44",
    cachedExplanations: "1,240",
    backgroundThreads: 4
  }
];
