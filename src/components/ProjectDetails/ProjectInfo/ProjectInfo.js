import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  makeStyles,
  Menu,
  Typography,
} from '@material-ui/core';
import { ArrowBack, MoreVert } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ComfirmationModal from '../../Shared/Modals/ComfirmationModal';
import { deleteProjectById } from '../../../redux/actions/projectActions';

const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingRight: 90,
    position: 'relative',
    paddingBottom: 16,
  },
  sideIcons: {
    position: 'absolute',
    right: 0,
    top: 16,
  },
  iconBtn: {
    padding: 5,
  },
  textTitle: {
    color: theme.palette.text.secondary,
  },
}));

const ProjectInfo = React.forwardRef(({ name, ownerId, projectId }, ref) => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user.user);
  const [owner, setOwner] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBackLink = () => {
    history.push('/dashboard');
  };

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProject = async handleCloseDialog => {
    await dispatch(
      deleteProjectById(projectId, handleCloseDialog, handleBackLink)
    );
    await handleBackLink();
  };

  useEffect(() => {
    if (currentUser.uid === ownerId) {
      setOwner(`${currentUser.firstName} ${currentUser.lastName}`);
    } else {
      //TODO get owner if not current user and shared users
      //   const ref = firebase.firestore().collection('users');
      //   const res = ref
      //     .doc(ownerId)
      //     .get()
      //     .then(userData => userData.data())
      //     .catch(err => console.error(err));
      //   console.log(res);
    }
  }, [currentUser, ownerId]);
  return (
    <div className={classes.wrapper}>
      <Box pt={2}>
        <Typography variant="h3" component="h1">
          {name}
        </Typography>
      </Box>
      <Box pb={1}>
        <Typography variant="body1" className={classes.textTitle}>
          Project
        </Typography>
      </Box>
      <Typography variant="body1">
        <span className={classes.textTitle}>Owner:</span> {owner}
      </Typography>
      <Typography variant="body1">
        <span className={classes.textTitle}>Shared to:</span> none
      </Typography>
      <div className={classes.sideIcons}>
        <IconButton
          className={classes.iconBtn}
          onClick={() => handleBackLink()}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <IconButton
          className={classes.iconBtn}
          onClick={e => handleMenuOpen(e)}
        >
          <MoreVert fontSize="large" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose()}
          className={classes.menu}
        >
          <ComfirmationModal
            triggerBtn={{ type: 'deleteMenuItem' }}
            title={`Are you sure you want to delete ${name}?`}
            handleMenuClose={handleMenuClose}
            ref={ref}
            handleDeleteProject={handleDeleteProject}
          />
        </Menu>
      </div>
    </div>
  );
});

export default ProjectInfo;
