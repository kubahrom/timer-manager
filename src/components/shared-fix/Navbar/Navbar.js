import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import MainMenu from './MainMenu/MainMenu';
import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 8,
  },
  appTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  hide: {
    display: 'none',
  },
  mainMenu: {
    flexGrow: 1,
    paddingRight: 8,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { loggedIn } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {loggedIn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.mainMenu}>
            <Link to="/" className={classes.appTitle}>
              Timer Manager
            </Link>
          </Typography>
          <MainMenu loggedIn={loggedIn} />
        </Toolbar>
      </AppBar>
      {loggedIn && (
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      )}
    </>
  );
};

export default Navbar;
