import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Flame,
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  SlidersHorizontal,
  History,
  Terminal,
  Cpu,
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
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = (): NavTab => {
    const path = location.pathname.replace('/console/', '').replace('/console', '');
    if (path === '' || path === 'gauntlet') return 'gauntlet';
    return path as NavTab;
  };

  const currentTab = getCurrentTab();

  const navSections = [
    {
      title: 'TESTING',
      items: [
        { id: 'gauntlet' as NavTab, label: 'The Gauntlet', icon: <Flame size={18} />, badge: 'LIVE' },
        { id: 'overview' as NavTab, label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { id: 'cases' as NavTab, label: 'Case Files', icon: <FolderOpen size={18} /> },
      ],
    },
    {
      title: 'ANALYSIS',
      items: [
        { id: 'benchmark' as NavTab, label: 'Benchmark', icon: <BarChart3 size={18} /> },
        { id: 'policy' as NavTab, label: 'Risk Policy', icon: <SlidersHorizontal size={18} /> },
        { id: 'court' as NavTab, label: 'Court Record', icon: <History size={18} /> },
      ],
    },
    {
      title: 'DEVELOPER',
      items: [
        { id: 'api' as NavTab, label: 'API Playground', icon: <Terminal size={18} /> },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: collapsed ? '68px' : '252px',
        backgroundColor: 'var(--surface-primary)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--dur-moderate) var(--ease-in-out)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: '4px', overflowY: 'auto' }}>
        {navSections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '8px' }}>
            {/* Section title */}
            {!collapsed && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '8px 12px 6px',
                }}
              >
                {section.title}
              </div>
            )}

            {section.items.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(`/console/${item.id}`)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: collapsed ? '10px 0' : '9px 12px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    backgroundColor: isActive ? 'var(--sapphire-50)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--dur-fast) var(--ease)',
                    position: 'relative',
                    marginBottom: '2px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--sky-200)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '20px',
                        backgroundColor: 'var(--sapphire-500)',
                        borderRadius: '0 var(--radius-full) var(--radius-full) 0',
                      }}
                    />
                  )}

                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? 'var(--sapphire-600)' : 'inherit',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                      {item.badge && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            fontWeight: 600,
                            backgroundColor: 'var(--accept-bg)',
                            color: 'var(--accept-text)',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer: Models Connected */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '16px',
          borderTop: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {!collapsed && (
          <>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              CONNECTED MODELS
            </div>
            {[
              { name: 'Prisma v3.0', type: 'STT', color: 'var(--accept)' },
              { name: 'Prisma v2.5', type: 'STT', color: 'var(--accept)' },
              { name: 'Timbre v3.0', type: 'TTS', color: 'var(--sapphire-500)' },
            ].map((model, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: model.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  {model.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--text-tertiary)',
                    backgroundColor: 'var(--sky-200)',
                    padding: '1px 5px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {model.type}
                </span>
              </div>
            ))}

            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-tertiary)',
              }}
            >
              <Cpu size={12} />
              <span>Powered by Gnani.ai</span>
            </div>
          </>
        )}

        {collapsed && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Cpu size={16} style={{ color: 'var(--text-tertiary)' }} />
          </div>
        )}
      </div>
    </aside>
  );
};
