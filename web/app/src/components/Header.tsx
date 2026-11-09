import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  HelpCircle,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  ExternalLink,
} from 'lucide-react';
import { CreditsMeter } from './CreditsMeter';

interface HeaderProps {
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isConsole = location.pathname.startsWith('/console');

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'var(--surface-primary)',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)' as any,
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Left: Logo + Sidebar Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isConsole && onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sky-200)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        )}

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
          }}
        >
          {/* Official AVOW Logo */}
          <img
            src="/avow-logo-dark.png"
            alt="AVOW Logo"
            style={{
              height: '28px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </button>
      </div>

      {/* Center: Search (console only) */}
      {isConsole && (
        <div
          style={{
            position: 'relative',
            width: '320px',
            maxWidth: '35%',
          }}
        >
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: searchFocused ? '#0A0A0A' : '#718096',
              transition: 'color 120ms ease',
            }}
          />
          <input
            type="text"
            placeholder="Search cases, entities, verdicts..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 12px 0 36px',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#0A0A0A',
              backgroundColor: searchFocused ? '#FFFFFF' : '#F4F4F0',
              border: `1.5px solid ${searchFocused ? '#0A0A0A' : '#E5E5E0'}`,
              borderRadius: '9999px',
              outline: 'none',
              transition: 'all 120ms ease',
            }}
          />
          <kbd
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#718096',
              backgroundColor: '#FFFFFF',
              padding: '2px 5px',
              borderRadius: '4px',
              border: '1px solid #E5E5E0',
              lineHeight: '1',
            }}
          >
            ⌘K
          </kbd>
        </div>
      )}

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {isConsole && <CreditsMeter usedRuns={18} maxRuns={150} environment="LIVE" />}

        {/* Docs Link */}
        <HeaderIconButton
          icon={<ExternalLink size={18} />}
          label="API Docs"
          onClick={() => navigate('/console/api')}
        />

        {/* Help */}
        <HeaderIconButton
          icon={<HelpCircle size={18} />}
          label="Help"
          onClick={() => {}}
        />

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <HeaderIconButton
            icon={<Bell size={18} />}
            label="Notifications"
            onClick={() => {}}
          />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--sapphire-500)',
              border: '2px solid var(--surface-primary)',
            }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '28px',
            backgroundColor: 'var(--border-default)',
            margin: '0 6px',
          }}
        />

        {/* Profile */}
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            transition: 'background var(--dur-fast) var(--ease)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--sky-100)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              backgroundColor: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: '1.2',
              }}
            >
              Dinesh
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-tertiary)',
                lineHeight: '1.2',
              }}
            >
              Operator
            </span>
          </div>
          <ChevronDown
            size={14}
            style={{
              color: 'var(--text-tertiary)',
              transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform var(--dur-fast) var(--ease)',
            }}
          />
        </button>
      </div>
    </header>
  );
};

/* ─── Header Icon Button ─── */
const HeaderIconButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    style={{
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-secondary)',
      transition: 'all var(--dur-fast) var(--ease)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--sky-100)';
      e.currentTarget.style.color = 'var(--text-primary)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'var(--text-secondary)';
    }}
  >
    {icon}
  </button>
);
