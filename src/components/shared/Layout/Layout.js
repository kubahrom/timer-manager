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
    paddingTop: 56,
    [theme.breakpoints.up('xs')]: {
      paddingTop: 64,
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
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
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
          <Route component={Custom404} />
        </Switch>
      </div>
    </>
  );
};
export default Layout;
