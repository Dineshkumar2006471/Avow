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
  X,
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
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen = false,
  onCloseMobile,
}) => {
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

  const handleNavClick = (tabId: NavTab) => {
    navigate(`/console/${tabId}`);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const renderNavContent = (isMobileView: boolean) => (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px', gap: '4px', overflowY: 'auto', flex: 1 }}>
        {navSections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '8px' }}>
            {(!collapsed || isMobileView) && (
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
              const showLabels = !collapsed || isMobileView;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={!showLabels ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: !showLabels ? '10px 0' : '10px 16px',
                    justifyContent: !showLabels ? 'center' : 'flex-start',
                    backgroundColor: isActive ? '#0A0A0A' : 'transparent',
                    border: 'none',
                    borderRadius: '9999px',
                    color: isActive ? '#FFFFFF' : '#4A5568',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 120ms ease',
                    marginBottom: '4px',
                    minHeight: '42px',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.14)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#F4F4F0';
                      e.currentTarget.style.color = '#0A0A0A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4A5568';
                    }
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: isActive ? '#FFFFFF' : 'inherit',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>

                  {showLabels && (
                    <>
                      <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                      {item.badge && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            fontWeight: 700,
                            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#FEF3C7',
                            color: isActive ? '#FFFFFF' : '#D97706',
                            padding: '2px 7px',
                            borderRadius: '9999px',
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

      {/* Footer: Models Connected + Sign Out */}
      <div
        style={{
          padding: !collapsed || isMobileView ? '16px' : '12px 8px',
          borderTop: '1px solid #E5E5E0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: 'var(--surface-primary)',
        }}
      >
        {(!collapsed || isMobileView) && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#718096',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                CONNECTED MODELS
              </div>
              {[
                { name: 'Prisma v3.0', type: 'STT' },
                { name: 'Prisma v2.5', type: 'STT' },
                { name: 'Timbre v3.0', type: 'TTS' },
              ].map((model, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#4A5568',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: '#0A0A0A' }}>
                    {model.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: '#718096',
                      backgroundColor: '#F4F4F0',
                      padding: '1px 5px',
                      borderRadius: '4px',
                    }}
                  >
                    {model.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Deal Forge Style Exit Button */}
            <button
              onClick={() => {
                navigate('/');
                if (onCloseMobile) onCloseMobile();
              }}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: '9999px',
                border: '1.5px solid #0A0A0A',
                backgroundColor: '#FFFFFF',
                color: '#0A0A0A',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 120ms ease',
                minHeight: '40px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0A0A0A';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#0A0A0A';
              }}
            >
              <span>[→ SIGN OUT]</span>
            </button>
          </>
        )}

        {collapsed && !isMobileView && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Cpu size={16} style={{ color: 'var(--text-tertiary)' }} />
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="console-sidebar-desktop"
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
        {renderNavContent(false)}
      </aside>

      {/* Mobile Drawer (visible on < 768px via CSS) */}
      <div className="console-sidebar-mobile">
        {mobileOpen && (
          <div
            className="sidebar-backdrop"
            onClick={onCloseMobile}
            aria-label="Close navigation overlay"
          />
        )}
        <aside
          className={`sidebar-drawer ${mobileOpen ? 'open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          {/* Mobile drawer header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              borderBottom: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--sapphire-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '13px',
                }}
              >
                A
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: '16px',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                AVOW
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-tertiary)',
                  padding: '2px 6px',
                  background: 'var(--surface-secondary)',
                  borderRadius: '4px',
                }}
              >
                CONSOLE
              </span>
            </div>
            <button
              onClick={onCloseMobile}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close navigation drawer"
            >
              <X size={20} />
            </button>
          </div>

          {renderNavContent(true)}
        </aside>
      </div>
    </>
  );
};
