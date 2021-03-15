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

const ModalWithButton = ({ triggerBtn, title, children }) => {
  const [modalOpen, setModalOpen] = useState(true);
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
            fullWidth={true}
            onClick={handleModalOpen}
          >
            {triggerBtn.text}
          </Button>
        );
    }
  };

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
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
export default ModalWithButton;
