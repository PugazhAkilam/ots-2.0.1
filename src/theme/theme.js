// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(10, 77, 201)',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
   
  },
 
});

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgb(96, 152, 255)',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            background-color:rgb(32, 32, 32);
            color: #ffffff;
            min-height: 100vh;
          }
          :root {
            color-scheme: dark;
          }
        `
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#1e1e1e'
          }
        }
      }
    }
  });
  
