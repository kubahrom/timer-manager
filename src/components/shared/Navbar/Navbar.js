import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  logoutUserFromApp,
  signupUser,
} from '../../../redux/actions/userActions';
import { switchTheme } from '../../../redux/actions/themeActions';

import styles from './styles.module.scss';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const Navbar = () => {
  const loggedUser = useSelector(state => state.user.loggedIn);
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const dispatch = useDispatch();
  const user = {
    email: 'testemail@email.cz',
    password: 'Test123456',
    firstName: 'John',
    lastName: 'Doee',
  };

  const handleSignup = () => {
    dispatch(signupUser(user));
  };

  const handleLogin = () => {
    dispatch(loginUser(user));
  };

  const handleLogout = () => {
    dispatch(logoutUserFromApp());
  };

  const handleSwitchTheme = () => {
    dispatch(switchTheme());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={styles.title}>
          Timer Manager
        </Typography>
        <div className={styles.menu}>
          {darkTheme ? (
            <IconButton
              aria-label="dark-mode"
              color="inherit"
              onClick={handleSwitchTheme}
            >
              <Brightness7Icon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="dark-mode"
              color="inherit"
              onClick={handleSwitchTheme}
            >
              <Brightness4Icon />
            </IconButton>
          )}

          {loggedUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={handleSignup}>
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
