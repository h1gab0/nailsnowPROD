import { colors } from './colors';

export const stylingGuide = {
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#553C9A', // A slightly darker purple for hover
      },
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.white,
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#E53E3E', // A slightly darker red for hover
      },
    },
  },
  // Form styles
  form: {
    input: {
      backgroundColor: colors.white,
      color: colors.black,
      padding: '12px',
      borderRadius: '8px',
      border: `1px solid ${colors.neutral}`,
      fontSize: '16px',
      '&:focus': {
        outline: 'none',
        borderColor: colors.primary,
      },
    },
    label: {
      color: colors.black,
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
  },
  // Modal styles
  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: colors.white,
      padding: '24px',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '100%',
    },
  },
};
