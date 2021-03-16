import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/actions/projectActions';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const ProjectList = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.user);
  const { projects } = useSelector(state => state.projects);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getProjects());
    }
  }, [loggedIn, dispatch]);
  return (
    <>
      <Grid container>
        {projects.map(project => (
          <ProjectDetail key={project.id} project={project} />
        ))}
      </Grid>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </>
  );
};

export default ProjectList;
