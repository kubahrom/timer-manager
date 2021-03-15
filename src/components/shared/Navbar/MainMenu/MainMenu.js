import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import { ExitToApp, ExpandLess, ExpandMore } from '@material-ui/icons/';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {
  logoutUserFromApp,
  resetUserError,
} from '../../../../redux/actions/userActions';
import { switchTheme } from '../../../../redux/actions/themeActions';

const useStyles = makeStyles(theme => ({
  userInfo: {
    paddingRight: 4,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  userAvatar: {
    width: 30,
    height: 30,
    fontSize: '1.05rem',
  },
  menuItemCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  dropdownMenu: {
    marginTop: 14,
    width: 150,
  },
}));

const MainMenu = ({ loggedIn }) => {
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const { firstName, lastName } = useSelector(state => state.user.user);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userSettings = useRef(null);

  const handleLogout = () => {
    handleUserSettingsClose();
    dispatch(logoutUserFromApp());
  };

  const handleSwitchTheme = () => {
    dispatch(switchTheme());
  };

  //Reset redux user errors after leave login or register page
  const resetUserState = e => {
    if (pathname !== '/login' || pathname !== '/register') {
      dispatch(resetUserError());
    }
  };

  const handleUserSettingsClose = () => {
    setOpenUserSettings(false);
  };
  return (
    <>
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
        <>
          <Button
            color="inherit"
            ref={userSettings}
            aria-controls={openUserSettings ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={() => setOpenUserSettings(!openUserSettings)}
          >
            <span className={classes.userInfo}>
              {firstName} {lastName}
            </span>
            <Avatar className={classes.userAvatar}>
              {firstName.slice(0, 1)}
              {lastName.slice(0, 1)}
            </Avatar>
            {openUserSettings ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Popper
            open={openUserSettings}
            anchorEl={userSettings.current}
            role={undefined}
            transition
            disablePortal
            placement="bottom-end"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                className={classes.dropdownMenu}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'rightz bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleUserSettingsClose}>
                    <MenuList
                      autoFocusItem={openUserSettings}
                      id="menu-list-grow"
                    >
                      <MenuItem
                        onClick={handleLogout}
                        className={classes.menuItemCenter}
                      >
                        <ExitToApp />
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
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
    </>
  );
};

export default MainMenu;
