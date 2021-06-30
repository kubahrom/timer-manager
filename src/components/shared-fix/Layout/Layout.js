import React from 'react';
import clsx from 'clsx';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route, useLocation } from 'react-router-dom';
import Register from '../../Register/Register';
import Login from '../../Login/Login';
import Custom404 from '../../404/Custom404';
import Home from '../../Home/Home';

import { useSelector } from 'react-redux';
import Dashboard from '../../Dashboard/Dashboard';
import { makeStyles } from '@material-ui/core';
import ProjectDetails from '../../ProjectDetails/ProjectDetails';
import { AnimatePresence } from 'framer-motion';

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
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div
        className={clsx(classes.contentWrapper, {
          [classes.contentWrapperLogged]: loggedIn,
        })}
      >
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
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
        </AnimatePresence>
      </div>
    </>
  );
};
export default Layout;
