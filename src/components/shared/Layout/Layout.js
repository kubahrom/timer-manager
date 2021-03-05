import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';

import Register from '../../Register/Register';
import Login from '../../Login/Login';
import Custom404 from '../../404/Custom404';
import Home from '../../Home/Home';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <Route component={Custom404} />
      </Switch>
    </>
  );
};
export default Layout;
