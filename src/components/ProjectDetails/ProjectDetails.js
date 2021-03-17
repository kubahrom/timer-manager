import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { getProject } from '../../redux/actions/projectActions';
import Timer from './Timer/Timer';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects, errorMessage } = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentProject, setCurrentProject] = useState({});
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
    <>
      <div>
        <h1>id = {id}</h1>
        {currentProject.created && <Timer created={currentProject.created} />}
      </div>
    </>
  );
};

export default ProjectDetails;
