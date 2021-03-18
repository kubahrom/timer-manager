import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  closeModalBtn: { position: 'absolute', top: 8, right: 8 },
}));

const ModalWithButton = ({
  triggerBtn,
  title,
  fullWidthBtn,
  btnSize,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const triggerButton = () => {
    switch (triggerBtn.type) {
      case 'fab':
        return '';
      default:
        return (
          <Button
            color="primary"
            variant="contained"
            fullWidth={fullWidthBtn}
            onClick={handleModalOpen}
            size={btnSize}
          >
            {triggerBtn.text}
          </Button>
        );
    }
  };

  const proppedChildren = React.isValidElement(children)
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
};
export default ModalWithButton;
