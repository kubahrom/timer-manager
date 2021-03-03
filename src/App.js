import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialUser } from './redux/actions/userActions';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import Layout from './components/shared/Layout/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BrowserRouter as Router } from 'react-router-dom';

import styles from './styles/app.module.scss';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.initUserLoad);
  const darkTheme = useSelector(state => state.theme.darkTheme);

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    dispatch(setInitialUser());
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          {isLoading ? (
            <div className={styles.loader_wrapper}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <Layout />
          )}
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;
