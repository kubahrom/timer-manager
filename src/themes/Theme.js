import { useSelector } from 'react-redux';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core';

const Theme = ({ children }) => {
  const darkTheme = useSelector(state => state.theme.darkTheme);

  let theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: '#009688',
      },
    },
    typography: {
      h1: {
        fontSize: '3.75rem',
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
