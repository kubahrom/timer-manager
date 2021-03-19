import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/actions/projectActions';
import NoProjects from '../NoProjects/NoProjects';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.user);
  const { projects, errorMessage, allLoaded } = useSelector(
    state => state.projects
  );

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
