import React from 'react';
import clsx from 'clsx';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import Custom404 from '../../404/Custom404';
import Home from '../../Home/Home';

import { useSelector } from 'react-redux';
import Dashboard from '../../Dashboard/Dashboard';
import { makeStyles } from '@material-ui/core';
import ProjectDetails from '../../ProjectDetails/ProjectDetails';

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
          <Route path="/" exact>
            {loggedIn ? <Dashboard /> : <Home />}
          </Route>
          <Route path="/register">
            {loggedIn ? <Dashboard /> : <Register />}
          </Route>
          <Route path="/login">{loggedIn ? <Dashboard /> : <Login />}</Route>
          <Route path="/dashboard">
            {loggedIn ? <Dashboard /> : <Login />}
          </Route>
          <Route path="/project/:id">
            {loggedIn ? <ProjectDetails /> : <Login />}
          </Route>
          <Route component={Custom404} />
        </Switch>
      </div>
    </>
  );
};
export default Layout;
