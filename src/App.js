import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialUser } from './redux/actions/userActions';

import { CssBaseline } from '@material-ui/core';
import Layout from './components/Shared/Layout/Layout';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BrowserRouter as Router } from 'react-router-dom';

import styles from './styles/app.module.scss';
import Theme from './themes/Theme';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.initUserLoad);
  useEffect(() => {
    dispatch(setInitialUser());
  }, [dispatch]);

  return (
    <Router>
      <Theme>
        <CssBaseline>
          {isLoading ? (
            <div className={styles.loader_wrapper}>
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <Layout />
          )}
        </CssBaseline>
      </Theme>
    </Router>
  );
}

export default App;
