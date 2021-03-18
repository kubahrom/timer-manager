import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/actions/projectActions';
import NoProjects from '../NoProjects/NoProjects';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.user);
  const { projects, errorMessage } = useSelector(state => state.projects);

  useEffect(() => {
    if (loggedIn && errorMessage !== 'no-projects' && projects.length === 0) {
      dispatch(getProjects());
    }
  }, [loggedIn, dispatch, errorMessage, projects]);
  return (
    <>
      {projects.length === 0 ? (
        <NoProjects />
      ) : (
        <Grid container spacing={2}>
          {projects.map(project => (
            <ProjectDetail key={project.id} project={project} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProjectList;
