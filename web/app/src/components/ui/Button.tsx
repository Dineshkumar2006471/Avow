import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'dark';
  size?: 'default' | 'compact' | 'xs' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  icon,
  children,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const heights = {
    lg: '48px',
    default: '42px',
    compact: '36px',
    xs: '30px',
  };

  const paddings = {
    lg: '0 24px',
    default: '0 18px',
    compact: '0 14px',
    xs: '0 10px',
  };

  const fontSizes = {
    lg: '15px',
    default: '14px',
    compact: '13px',
    xs: '12px',
  };

  let bg = 'var(--sapphire-600)';
  let color = '#FFFFFF';
  let border = '1px solid transparent';
  let shadow = 'var(--shadow-sm)';

  if (variant === 'secondary') {
    bg = 'var(--sky-100)';
    color = 'var(--sapphire-700)';
    border = '1px solid var(--sky-300)';
    shadow = 'none';
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = 'var(--sapphire-600)';
    border = '1.5px solid var(--sapphire-500)';
    shadow = 'none';
  } else if (variant === 'ghost') {
    bg = 'transparent';
    color = 'var(--text-secondary)';
    border = '1px solid transparent';
    shadow = 'none';
  } else if (variant === 'danger') {
    bg = 'var(--escalate)';
    color = '#FFFFFF';
    border = '1px solid transparent';
  } else if (variant === 'dark') {
    bg = 'var(--text-primary)';
    color = '#FFFFFF';
    border = '1px solid var(--text-primary)';
    shadow = 'var(--shadow-sm)';
  }

  if (disabled) {
    bg = 'var(--sky-200)';
    color = 'var(--text-tertiary)';
    border = '1px solid var(--border-default)';
    shadow = 'none';
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
        borderRadius: 'var(--radius-md)',
        boxShadow: shadow,
        fontFamily: 'var(--font-sans)',
        fontSize: fontSizes[size],
        fontWeight: 600,
        letterSpacing: '-0.01em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--dur-fast) var(--ease)',
        ...style,
      }}
      className={`avow-btn ${className}`}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--sapphire-700)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 82, 186, 0.25)';
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = 'var(--sky-200)';
          } else if (variant === 'ghost') {
            e.currentTarget.style.backgroundColor = 'var(--sky-200)';
            e.currentTarget.style.color = 'var(--text-primary)';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = 'var(--sapphire-50)';
          } else if (variant === 'dark') {
            e.currentTarget.style.backgroundColor = '#000000';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = bg;
          e.currentTarget.style.boxShadow = shadow;
          if (variant === 'ghost') e.currentTarget.style.color = color;
        }
      }}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};
