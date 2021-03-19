import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  closeModalBtn: { position: 'absolute', top: 8, right: 8 },
}));

const ModalWithButton = React.forwardRef(
  (
    { triggerBtn, title, fullWidthBtn, permanent, closeMenu, children },
    ref
  ) => {
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();

    const handleModalOpen = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
      if (closeMenu) {
        closeMenu();
      }
    };

    const triggerButton = () => {
      switch (triggerBtn.type) {
        case 'menuEdit':
          return (
            <MenuItem ref={ref}>
              <span
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={handleModalOpen}
              >
                <Edit />
                {triggerBtn.text}
              </span>
            </MenuItem>
          );
        default:
          return (
            <Button
              color="primary"
              variant="contained"
              fullWidth={fullWidthBtn}
              onClick={handleModalOpen}
              size={triggerBtn.size}
            >
              {triggerBtn.text}
            </Button>
          );
      }
    };

    const proppedChildren =
      React.isValidElement(children) && permanent
        ? React.cloneElement(children, {
            closeModal: handleModalClose,
          })
        : children;

    return (
      <>
        {triggerButton()}
        <Dialog
          open={modalOpen}
          onClose={handleModalClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{title}</DialogTitle>
          <IconButton
            onClick={handleModalClose}
            className={classes.closeModalBtn}
          >
            <Close />
          </IconButton>
          <DialogContent>{proppedChildren}</DialogContent>
        </Dialog>
      </>
    );
  }
);
export default ModalWithButton;
