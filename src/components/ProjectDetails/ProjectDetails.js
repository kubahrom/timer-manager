import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getProject } from '../../redux/actions/projectActions';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import { v4 as uuidv4 } from 'uuid';
import { createNewTimer } from '../../redux/actions/timerActions';
import TimerList from './TimerList/TimerList';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 8,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
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

  const pageLoadVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  const handleCreateTimer = closeMenu => {
    dispatch(
      createNewTimer(
        {
          id: uuidv4(),
          uid: uid,
          projectId: currentProject.id,
          isOpen: true,
          start: 0,
          tempStart: 0,
          comment: '',
          lastValue: 0,
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

  if (currentProject === undefined) {
    return <CircularProgress color="secondary" size={70} />;
  }

  return (
    <>
      {Object.keys(currentProject).length === 0 ? (
        <div className={classes.loading}>
          <CircularProgress color="inherit" size={70} />
        </div>
      ) : (
        <Container
          maxWidth="md"
          style={{ padding: 8 }}
          className={classes.container}
          component={motion.div}
          variants={pageLoadVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <ProjectInfo
            name={currentProject.name}
            ownerId={currentProject.owner}
            projectId={currentProject.id}
            handleCreateTimer={handleCreateTimer}
          />
          {currentProject.id && <TimerList projectId={currentProject.id} />}
        </Container>
      )}
    </>
  );
};

export default ProjectDetails;
