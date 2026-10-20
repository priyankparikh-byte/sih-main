import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AssetMonitoring from './pages/AssetMonitoring';
import RULPredictions from './pages/RULPredictions';
import AnomalyDetection from './pages/AnomalyDetection';
import Explainability from './pages/Explainability';
import ModelValidation from './pages/ModelValidation';
import SystemHealth from './pages/SystemHealth';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<AssetMonitoring />} />
          <Route path="rul" element={<RULPredictions />} />
          <Route path="anomalies" element={<AnomalyDetection />} />
          <Route path="explainability" element={<Explainability />} />
          <Route path="models" element={<ModelValidation />} />
          <Route path="health" element={<SystemHealth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
