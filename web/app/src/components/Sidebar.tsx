import React from 'react';
import {
  Activity,
  Flame,
  FolderOpen,
  BarChart3,
  Sliders,
  History,
  Terminal,
} from 'lucide-react';

export type NavTab =
  | 'gauntlet'
  | 'overview'
  | 'cases'
  | 'benchmark'
  | 'policy'
  | 'court'
  | 'api';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; isHot?: boolean }[] = [
    { id: 'gauntlet', label: 'THE GAUNTLET', icon: <Flame size={16} />, isHot: true },
    { id: 'overview', label: 'OVERVIEW', icon: <Activity size={16} /> },
    { id: 'cases', label: 'CASE FILES', icon: <FolderOpen size={16} /> },
    { id: 'benchmark', label: 'BENCHMARK', icon: <BarChart3 size={16} /> },
    { id: 'policy', label: 'RISK POLICY', icon: <Sliders size={16} /> },
    { id: 'court', label: 'COURT RECORD', icon: <History size={16} /> },
    { id: 'api', label: 'API PLAYGROUND', icon: <Terminal size={16} /> },
  ];

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: 'var(--navy-950)',
        borderRight: '1px solid var(--navy-300)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 0',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div
          style={{
            padding: '8px 16px 12px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          NAVIGATION
        </div>

        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: isActive ? 'var(--navy-800)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--navy-500)' : '3px solid transparent',
                borderRight: 'none',
                borderTop: 'none',
                borderBottom: 'none',
                color: isActive ? 'var(--text-1)' : 'var(--text-2)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background-color 110ms var(--ease), color 110ms var(--ease)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: isActive ? 'var(--navy-500)' : 'var(--text-3)' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.isHot && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    backgroundColor: 'rgba(245, 185, 66, 0.15)',
                    color: 'var(--confirm)',
                    border: '1px solid var(--confirm)',
                    padding: '1px 5px',
                  }}
                >
                  LIVE
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid var(--navy-300)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-3)',
        }}
      >
        <div>MODELS CONNECTED:</div>
        <div style={{ color: 'var(--text-2)' }}>• Prisma v3.0 (STT)</div>
        <div style={{ color: 'var(--text-2)' }}>• Prisma v2.5 (STT)</div>
        <div style={{ color: 'var(--text-2)' }}>• Timbre v3.0 (TTS)</div>
      </div>
    </aside>
  );
};
