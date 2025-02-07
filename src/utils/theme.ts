// styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fc91ea', // Rosa
    },
    secondary: {
      main: '#ff4081', // Rosa
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: 'serif;',
    fontSize: 16,
  },
  spacing: 8, // Espaciado base
});
