import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './routes/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { GauntletPage } from './routes/GauntletPage';
import { OverviewPage } from './routes/OverviewPage';
import { CaseFilesPage } from './routes/CaseFilesPage';
import { BenchmarkPage } from './routes/BenchmarkPage';
import { PolicyPage } from './routes/PolicyPage';
import { CourtRecordPage } from './routes/CourtRecordPage';
import { ApiPlaygroundPage } from './routes/ApiPlaygroundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard (console) routes */}
        <Route path="/console" element={<DashboardLayout />}>
          <Route index element={<Navigate to="gauntlet" replace />} />
          <Route path="gauntlet" element={<GauntletPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="cases" element={<CaseFilesPage />} />
          <Route path="benchmark" element={<BenchmarkPage />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="court" element={<CourtRecordPage />} />
          <Route path="api" element={<ApiPlaygroundPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
