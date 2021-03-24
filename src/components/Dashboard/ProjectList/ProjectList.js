import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/actions/projectActions';
import NoProjects from '../NoProjects/NoProjects';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import { motion } from 'framer-motion';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.user);
  const { projects, errorMessage, allLoaded } = useSelector(
    state => state.projects
  );

  const projectListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  useEffect(() => {
    if (loggedIn && errorMessage !== 'no-projects' && allLoaded === false) {
      dispatch(getProjects());
    }
  }, [loggedIn, dispatch, errorMessage, allLoaded]);
  return (
    <>
      {projects.length === 0 ? (
        <NoProjects />
      ) : (
        <Grid
          container
          spacing={2}
          variants={projectListVariants}
          component={motion.div}
          initial="hidden"
          animate="visible"
        >
          {projects.map(project => (
            <ProjectDetail key={project.id} project={project} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProjectList;
