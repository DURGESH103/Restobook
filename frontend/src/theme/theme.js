// Centralized Theme Configuration
export const theme = {
  colors: {
    primary: {
      gold: '#D4AF37',
      goldLight: '#E5C158',
      goldDark: '#B8941F',
    },
    dark: {
      bg: '#0A0A0A',
      card: '#1A1A1A',
      border: '#2A2A2A',
      text: '#E5E5E5',
      textSecondary: '#A0A0A0',
    },
    light: {
      bg: '#FFFFFF',
      card: '#F8F9FA',
      border: '#E5E7EB',
      text: '#1F2937',
      textSecondary: '#6B7280',
    },
    status: {
      pending: '#F59E0B',
      confirmed: '#10B981',
      rejected: '#EF4444',
      cancelled: '#6B7280',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    premium: '0 10px 40px rgba(212, 175, 55, 0.15)',
    glow: '0 0 20px rgba(212, 175, 55, 0.3)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};
