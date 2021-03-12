import React from 'react';
import clsx from 'clsx';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  contentWrapperLogged: {
    paddingLeft: 57,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
}));

const Layout = () => {
  const { loggedIn } = useSelector(state => state.user);
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
          <Route path="/dashboard" component={Dashboard} />
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Route path="/register" component={Register} />
          )}
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Route path="/login" component={Login} />
          )}
          <Route path="/" exact component={Home} />
          <Route component={Custom404} />
        </Switch>
      </div>
    </>
  );
};
export default Layout;
