import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProject } from '../../redux/actions/projectActions';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects, errorMessage } = useSelector(state => state.projects);
  //const ids = projects.map(project => project.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (projects.length === 0 && !errorMessage) {
      dispatch(getProject(id));
      console.log('getProject');
    } else if (errorMessage === 'not-found') {
      console.log('Not found');
    } else {
      console.log('Okay');
    }
  }, [projects, errorMessage, dispatch, id]);

  return (
    <>
      <div>
        <h1>id = {id}</h1>
      </div>
    </>
  );
};

export default ProjectDetails;
