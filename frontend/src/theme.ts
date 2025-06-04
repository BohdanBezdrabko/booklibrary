import { createTheme } from '@mui/material/styles';

// Creating a completely new theme with a dark, modern aesthetic
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa', // Purple
      light: '#c158dc',
      dark: '#5c007a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5ff', // Cyan
      light: '#6effff',
      dark: '#00b2cc',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#ff5252',
    },
    warning: {
      main: '#ffab40',
    },
    info: {
      main: '#64b5f6',
    },
    success: {
      main: '#69f0ae',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #8e24aa 30%, #c158dc 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #00b2cc 30%, #00e5ff 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom right, rgba(142, 36, 170, 0.05), rgba(0, 229, 255, 0.05))',
            zIndex: 0,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #121212 0%, #2d2d2d 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8e24aa',
            },
          },
        },
      },
    },
  },
});

export default theme;
