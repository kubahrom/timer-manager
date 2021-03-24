import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  btnDelete: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 4,
    },
  },
}));

const ComfirmationModal = React.forwardRef(
  ({ triggerBtn, title, handleMenuClose, action }, ref) => {
    const [open, setOpen] = useState(false);
    const [btnDeleteDisabled, setBtnDeleteDisabled] = useState(false);
    const classes = useStyles();
    const triggerButon = () => {
      switch (triggerBtn.type) {
        case 'deleteMenuItem':
          return (
            <MenuItem ref={ref}>
              <span className={classes.menuItem} onClick={handleModalOpen}>
                <Delete />
                Delete
              </span>
            </MenuItem>
          );
        case 'deleteBtn': {
          return (
            <Button className={classes.btnDelete} onClick={handleModalOpen}>
              {triggerBtn.text}
            </Button>
          );
        }
        default:
          return (
            <Button
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={handleModalOpen}
            >
              {triggerBtn.text}
            </Button>
          );
      }
    };

    const handleModalOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      handleMenuClose && handleMenuClose(false);
    };
    const handleDelete = () => {
      setBtnDeleteDisabled(true);
      action();
    };
    return (
      <>
        {triggerButon()}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogActions style={{ padding: 24 }}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="primary"
              variant="contained"
              disabled={btnDeleteDisabled}
              autoFocus
            >
              {triggerBtn.text || 'Delete project'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
export default ComfirmationModal;
