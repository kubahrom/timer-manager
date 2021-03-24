import React from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  Button,
  Menu,
  Chip,
  Avatar,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteProjectById } from '../../../redux/actions/projectActions';
import ComfirmationModal from '../../Shared/Modals/ComfirmationModal';
import ModalWithButton from '../../Shared/Modals/ModalWithButton';
import ProjectForm from '../../Shared/Modals/ProjectForm';
import { deleteTimersByProjectId } from '../../../redux/actions/timerActions';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 20,
    paddingLeft: 8,
  },
  cardContent: {
    padding: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: 24,
    paddingTop: 0,
  },
  menu: {
    borderRadius: 20,
  },
  textTitle: {
    color: theme.palette.text.secondary,
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  chip: {
    marginLeft: 12,
  },
}));

const ProjectDetail = React.forwardRef(({ project }, ref) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  //TODO change to owner instead of logged user
  const { firstName, lastName } = useSelector(state => state.user.user);
  const created = new Date(project.created).toLocaleDateString();
  const [anchorEl, setAnchorEl] = useState(null);

  const projectDetailVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProject = handleCloseDialog => {
    dispatch(deleteTimersByProjectId(project.id));
    dispatch(deleteProjectById(project.id, handleCloseDialog));
  };

  const handleOpenProjectBtnClick = () => {
    history.push(`/project/${project.id}`);
  };
  return (
    <Grid
      item
      sm={6}
      xs={12}
      component={motion.div}
      variants={projectDetailVariants}
    >
      <Card className={classes.card} elevation={5}>
        <CardHeader
          action={
            <IconButton onClick={e => handleMenuOpen(e)}>
              <MoreVert />
            </IconButton>
          }
          title={
            <Typography variant="h5" component="h3">
              {project.name}
            </Typography>
          }
        />
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose()}
          className={classes.menu}
        >
          <ModalWithButton
            triggerBtn={{ type: 'menuEdit', text: 'Edit' }}
            title="Edit project"
            permanent={true}
            closeMenu={handleMenuClose}
          >
            <ProjectForm
              name={project.name}
              edit={true}
              btnText="Save changes"
              id={project.id}
            />
          </ModalWithButton>
          <ComfirmationModal
            triggerBtn={{ type: 'deleteMenuItem' }}
            title={`Are you sure you want to delete ${project.name}?`}
            handleMenuClose={handleMenuClose}
            ref={ref}
            action={handleDeleteProject}
          />
        </Menu>
        <CardContent className={classes.cardContent}>
          <Typography variant="body1" className={classes.chipWrapper}>
            <span className={classes.textTitle}>Owner: </span>
            <Chip
              component="span"
              variant="outlined"
              label={`${firstName} ${lastName}`}
              className={classes.chip}
              avatar={
                <Avatar component="span">
                  {firstName.slice(0, 1)}
                  {lastName.slice(0, 1)}
                </Avatar>
              }
            />
          </Typography>
          <Typography variant="body1">
            <span className={classes.textTitle}>Created: </span>
            {created}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpenProjectBtnClick()}
          >
            Open project
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});
export default ProjectDetail;
