import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logoutUserFromApp,
  resetUserError,
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
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { loggedIn } = useSelector(state => state.user);
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUserFromApp());
  };

  const handleSwitchTheme = () => {
    dispatch(switchTheme());
  };

  const resetUserState = e => {
    if (pathname !== '/login' || pathname !== '/register') {
      dispatch(resetUserError());
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={styles.title}>
          <Link to="/">Timer Manager</Link>
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

          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login" onClick={e => resetUserState(e)}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" onClick={e => resetUserState(e)}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
