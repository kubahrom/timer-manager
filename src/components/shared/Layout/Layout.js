import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';

import Register from '../../Register/Register';
import Login from '../../Login/Login';
import Custom404 from '../../404/Custom404';
import Home from '../../Home/Home';
import { useSelector } from 'react-redux';

const Layout = () => {
  const { loggedIn } = useSelector(state => state.user);
  return (
    <>
      <Navbar />
      <Switch>
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
    </>
  );
};
export default Layout;
