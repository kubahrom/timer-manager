import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';

import RegisterForm from '../../register/RegisterForm/RegisterForm';
import LoginForm from '../../login/LoginForm/LoginForm';
import Custom404 from '../../404/Custom404';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route component={Custom404} />
      </Switch>
    </>
  );
};
export default Layout;
