import { useSelector } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const Theme = ({ children }) => {
  const darkTheme = useSelector(state => state.theme.darkTheme);

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      secondary: {
        main: '#9fa8da',
      },
    },
    typography: {
      h1: {
        fontSize: '3.75rem',
      },
    },
  });

  theme.typography.h1 = {
    ...theme.typography.h1,
    fontSize: '3.75rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.4rem',
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
