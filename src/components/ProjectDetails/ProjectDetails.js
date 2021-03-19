import { Container, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getProject } from '../../redux/actions/projectActions';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import TimerTest from './Timer/TimerTest';
import { v4 as uuidv4 } from 'uuid';
import { createNewTimer } from '../../redux/actions/timerActions';
import TimerList from './TimerList/TimerList';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
  },
}));

const ProjectDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { uid } = useSelector(state => state.user.user);
  const { projects, errorMessage } = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentProject, setCurrentProject] = useState({});

  const handleCreateTimer = closeMenu => {
    dispatch(
      createNewTimer(
        {
          id: uuidv4(),
          uid: uid,
          projectId: currentProject.id,
          isOpen: true,
        },
        closeMenu
      )
    );
  };

  //Initial load of project, if not loaded
  useEffect(() => {
    if (projects.length === 0 && !errorMessage) {
      dispatch(getProject(id));
    } else if (errorMessage === 'not-found') {
      history.replace('/project-not-found');
    } else {
      setCurrentProject(projects.find(project => project.id === id));
    }
  }, [projects, errorMessage, dispatch, id, history, currentProject]);

  return (
    <Container
      maxWidth="md"
      style={{ padding: 8 }}
      className={classes.container}
    >
      <ProjectInfo
        name={currentProject.name}
        ownerId={currentProject.owner}
        projectId={currentProject.id}
        handleCreateTimer={handleCreateTimer}
      />
      {currentProject.id && <TimerList projectId={currentProject.id} />}
      {currentProject.created && <TimerTest created={currentProject.created} />}
    </Container>
  );
};

export default ProjectDetails;
