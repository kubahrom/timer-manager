import { useState } from 'react';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { Delete, Edit, Redo } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  deleteTimerById,
  updateTimer,
} from '../../../redux/actions/timerActions';

const useStyles = makeStyles(theme => ({
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 4,
    },
  },
}));

const EditTimerMenu = ({ timerId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReopenTimer = () => {
    dispatch(
      updateTimer({
        id: timerId,
        isOpen: true,
      })
    );
  };

  const handleDeleteTimer = () => {
    dispatch(deleteTimerById(timerId));
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Edit />
      </IconButton>
      <Menu
        id="timer-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
      >
        <MenuItem onClick={() => handleReopenTimer()}>
          <span className={classes.menuItem}>
            <Redo />
            Reopen timer
          </span>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTimer()}>
          <span className={classes.menuItem}>
            <Delete />
            Delete timer
          </span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default EditTimerMenu;
