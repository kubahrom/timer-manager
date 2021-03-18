import { makeStyles, Typography } from '@material-ui/core';
import { AddToQueue } from '@material-ui/icons';
import ModalWithButton from '../../Shared/Modals/ModalWithButton';
import ProjectForm from '../../Shared/Modals/ProjectForm';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 32,
  },
  icon: {
    fontSize: 200,
    color: theme.palette.action.disabledBackground,
  },
  text: {
    color: theme.palette.action.disabled,
    paddingBottom: 16,
  },
}));

const NoProjects = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AddToQueue className={classes.icon} />
      <Typography variant="h5" component="h3" className={classes.text}>
        Create new project to time your work.
      </Typography>
      <ModalWithButton
        triggerBtn={{ text: 'Add new project' }}
        title="Add a new project"
        btnSize="large"
      >
        <ProjectForm />
      </ModalWithButton>
    </div>
  );
};

export default NoProjects;
