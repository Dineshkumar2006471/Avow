import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { GauntletPage } from './routes/GauntletPage';
import { OverviewPage } from './routes/OverviewPage';
import { CaseFilesPage } from './routes/CaseFilesPage';
import { BenchmarkPage } from './routes/BenchmarkPage';
import { PolicyPage } from './routes/PolicyPage';
import { CourtRecordPage } from './routes/CourtRecordPage';
import { ApiPlaygroundPage } from './routes/ApiPlaygroundPage';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('gauntlet');

  const renderContent = () => {
    switch (currentTab) {
      case 'gauntlet':
        return <GauntletPage />;
      case 'overview':
        return <OverviewPage />;
      case 'cases':
        return <CaseFilesPage />;
      case 'benchmark':
        return <BenchmarkPage />;
      case 'policy':
        return <PolicyPage />;
      case 'court':
        return <CourtRecordPage />;
      case 'api':
        return <ApiPlaygroundPage />;
      default:
        return <GauntletPage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--navy-950)' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />
        <main
          style={{
            flex: 1,
            padding: '32px 40px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 48px)',
          }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
