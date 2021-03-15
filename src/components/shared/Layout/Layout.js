import React from 'react';
import clsx from 'clsx';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import Custom404 from '../../404/Custom404';
import Home from '../../Home/Home';

import { useSelector } from 'react-redux';
import Dashboard from '../../Dashboard/Dashboard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    paddingTop: 64,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 56,
    },
  },
  contentWrapperLogged: {
    paddingLeft: 58,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
    },
  },
}));

const Layout = () => {
  const { loggedIn } = useSelector(state => state.user);
  const { pathname } = useLocation();
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div
        className={clsx(classes.contentWrapper, {
          [classes.contentWrapperLogged]: loggedIn,
        })}
      >
        <Switch>
          {loggedIn ? (
            <Route path="/" exact component={Dashboard} />
          ) : (
            <Route path="/" exact component={Home} />
          )}

          {loggedIn && pathname === '/register' ? (
            <Redirect to="/" />
          ) : (
            <Route path="/register" component={Register} />
          )}
          {loggedIn && pathname === '/login' ? (
            <Redirect to="/" />
          ) : (
            <Route path="/login" component={Login} />
          )}
          {loggedIn && pathname === '/dashboard' ? (
            <Route path="/dashboard" component={Dashboard} />
          ) : (
            <Redirect to="/login" />
          )}
          <Route component={Custom404} />
        </Switch>
      </div>
    </>
  );
};
export default Layout;
