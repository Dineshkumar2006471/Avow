import React from 'react';

interface TileProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Tile: React.FC<TileProps> = ({ title, action, children, className = '', style }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--navy-850)',
        border: '1px solid var(--navy-300)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style,
      }}
      className={className}
    >
      {(title || action) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--navy-300)',
            paddingBottom: '12px',
          }}
        >
          {title && <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-1)' }}>{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
