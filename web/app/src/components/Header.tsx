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
  Menu,
  X,
} from 'lucide-react';
import { CreditsMeter } from './CreditsMeter';

interface HeaderProps {
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
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
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Left: Logo + Sidebar Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isConsole && (
          <>
            {/* Desktop toggle button */}
            <button
              onClick={onToggleSidebar}
              className="desktop-only"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                alignItems: 'center',
                transition: 'all var(--dur-fast) var(--ease)',
              }}
              aria-label="Toggle sidebar desktop"
            >
              {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={onToggleMobileMenu || onToggleSidebar}
              className="mobile-only"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}

        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
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
              height: '24px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </button>
      </div>

      {/* Center: Search (desktop console only) */}
      {isConsole && (
        <div
          className="desktop-only"
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

        {/* Docs Link (desktop only) */}
        <div className="desktop-only">
          <HeaderIconButton
            icon={<ExternalLink size={18} />}
            label="API Docs"
            onClick={() => navigate('/console/api')}
          />
        </div>

        {/* Help (desktop only) */}
        <div className="desktop-only">
          <HeaderIconButton
            icon={<HelpCircle size={18} />}
            label="Help"
            onClick={() => {}}
          />
        </div>

        {/* Notifications (desktop only) */}
        <div className="desktop-only" style={{ position: 'relative' }}>
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

        {/* Divider (desktop only) */}
        <div
          className="desktop-only"
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
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 6px',
            borderRadius: 'var(--radius-md)',
            transition: 'background var(--dur-fast) var(--ease)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            D
          </div>
          <div className="desktop-only" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0A0A0A', lineHeight: '14px' }}>
              Dinesh
            </span>
            <span style={{ fontSize: '10px', color: '#718096', lineHeight: '12px' }}>
              Operator
            </span>
          </div>
          <ChevronDown size={14} color="#718096" />
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
