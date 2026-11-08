import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'default' | 'compact' | 'xs';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const heights = {
    default: '48px',
    compact: '40px',
    xs: '32px',
  };

  const paddings = {
    default: '0 24px',
    compact: '0 16px',
    xs: '0 12px',
  };

  let bg = 'var(--navy-600)';
  let color = '#FFFFFF';
  let border = 'none';

  if (variant === 'secondary') {
    bg = 'transparent';
    color = 'var(--navy-500)';
    border = '1px solid var(--navy-500)';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = 'var(--text-1)';
    border = 'none';
  } else if (variant === 'danger') {
    bg = '#B3261E';
    color = '#FFFFFF';
    border = 'none';
  }

  if (disabled) {
    bg = 'var(--navy-800)';
    color = 'var(--text-3)';
    border = '1px solid var(--navy-300)';
  }

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        height: heights[size],
        padding: paddings[size],
        backgroundColor: bg,
        color: color,
        border: border,
        fontFamily: 'var(--font-mono)',
        fontSize: size === 'xs' ? '12px' : '14px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 110ms var(--ease), border-color 110ms var(--ease)',
      }}
      className={`avow-btn ${className}`}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </button>
  );
};
