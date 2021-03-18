import { useState, useEffect } from 'react';
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { ArrowBack, MoreVert } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

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

const ProjectInfo = ({ name, ownerId }) => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.user.user);
  const [owner, setOwner] = useState('');
  const history = useHistory();

  const handleBackLink = () => {
    history.push('/dashboard');
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
        <IconButton className={classes.iconBtn}>
          <MoreVert fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default ProjectInfo;
