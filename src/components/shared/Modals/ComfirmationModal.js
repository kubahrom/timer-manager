import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const ComfirmationModal = React.forwardRef(
  ({ triggerBtn, title, handleMenuClose, handleDeleteProject }, ref) => {
    const [open, setOpen] = useState(false);
    const [btnDeleteDisabled, setBtnDeleteDisabled] = useState(false);

    const triggerButon = () => {
      switch (triggerBtn.type) {
        case 'deleteMenuItem':
          return (
            <MenuItem ref={ref}>
              <span
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={handleModalOpen}
              >
                <Delete />
                Delete
              </span>
            </MenuItem>
          );
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
      handleMenuClose(false);
    };
    const handleDelete = () => {
      setBtnDeleteDisabled(true);
      handleDeleteProject();
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
              Delete project
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);
export default ComfirmationModal;
