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
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteProjectById } from '../../../redux/actions/projectActions';
import ComfirmationModal from '../../Shared/Modals/ComfirmationModal';
import ModalWithButton from '../../Shared/Modals/ModalWithButton';
import ProjectForm from '../../Shared/Modals/ProjectForm';
import { deleteTimersByProjectId } from '../../../redux/actions/timerActions';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: 20,
    paddingLeft: 8,
  },
  cardActions: {
    justifyContent: 'flex-end',
    padding: 24,
  },
  menu: {
    borderRadius: 20,
  },
}));

const ProjectDetail = React.forwardRef(({ project }, ref) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const created = new Date(project.created).toLocaleString();
  const [anchorEl, setAnchorEl] = useState(null);

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
    <Grid item sm={6} xs={12}>
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
            handleDeleteProject={handleDeleteProject}
          />
        </Menu>
        <CardContent>
          <Typography variant="body1">Created: {created}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            color="primary"
            variant="outlined"
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
