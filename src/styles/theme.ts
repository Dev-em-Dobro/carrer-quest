export const theme = {
  colors: {
    brand: {
      primary: '#9d4edd',
      light: '#b84eeb', 
      dark: '#8b3ed1',
      50: 'rgba(157, 78, 221, 0.05)',
      100: 'rgba(157, 78, 221, 0.1)',
      200: 'rgba(157, 78, 221, 0.2)',
      300: 'rgba(157, 78, 221, 0.3)',
      500: '#9d4edd',
      700: '#8b3ed1',
      900: '#6b2a9f',
    },
    accent: {
      green: '#0CF2A0',
      orange: '#e34c26', 
      blue: '#1572b6',
      yellow: '#f7df1e',
    },
    background: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      tertiary: '#172122',
      card: 'rgba(26, 26, 26, 0.8)',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#fff6e9',
      secondary: 'rgba(255, 246, 233, 0.8)',
      muted: 'rgba(255, 246, 233, 0.6)',
      accent: '#9d4edd',
    },
    border: {
      default: '#374151',
      hover: 'rgba(157, 78, 221, 0.5)',
    },
    status: {
      success: '#10b981',
      warning: '#f59e0b', 
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  typography: {
    fontFamily: {
      sans: 'Inter, Segoe UI, Roboto, sans-serif',
      retro: 'Press Start 2P',
      mono: 'Fira Code, Consolas, Monaco',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    md: '0.25rem',   // 4px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
} as const;

export type Theme = typeof theme;