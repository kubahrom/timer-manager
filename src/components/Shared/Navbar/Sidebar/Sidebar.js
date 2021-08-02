import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Assessment, Group, Info, Search, Settings } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(
  theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
      [theme.breakpoints.down('sm')]: {
        borderRight: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    listItemBottom: {
      marginTop: 'auto',
    },
    notWorkingText: {
      fontWeight: 'bold',
      fontSize: '0.9rem',
      color: theme.palette.error.light,
    },
  }),
  { index: 1 }
);

const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography
          variant="overline"
          component="p"
          align="center"
          className={classes.notWorkingText}
        >
          Not implemented
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
        <ListItem button className={classes.listItemBottom}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
