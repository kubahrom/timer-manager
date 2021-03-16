import firebase from '../../firebase/firebase';

//Actions
export const SET_PROJECTS = 'set_projects';
export const PROJECTS_ERROR = 'projects_error';
export const ADD_PROJECT = 'add_project';
export const DELETE_PROJECT = 'delete_project';

//Set project action creator
const setProjects = payload => ({ type: SET_PROJECTS, payload });

//Add project action creator
const addProject = payload => ({ type: ADD_PROJECT, payload });

//Project error action creator
const projectError = payload => ({ type: PROJECTS_ERROR, payload });

//Set projects based on user
export const getProjects = () => async (dispatch, getState) => {
  try {
    const { uid } = getState().user.user;
    const ref = firebase.firestore().collection('projects');
    const res = await ref.where('owner', '==', uid).get();
    const data = await res.docs.map(doc => doc.data());
    dispatch(setProjects(data));
  } catch (err) {
    console.error(err);
  }
};

//Get project based on user and project id
export const getProject = projectId => async (dispatch, getState) => {
  try {
    const { uid } = getState().user.user;
    const ref = firebase.firestore().collection('projects');
    const res = await ref
      .where('owner', '==', uid)
      .where('id', '==', projectId)
      .get();
    const data = await res.docs.map(doc => doc.data());
    if (data.length !== 0) {
      dispatch(setProjects(data));
    } else {
      dispatch(projectError('not-found'));
    }
  } catch (err) {
    console.error(err);
  }
};

//Add new project
export const createNewProject = (project, closeModal) => async dispatch => {
  try {
    const ref = firebase.firestore().collection('projects');
    const newProject = {
      id: project.id,
      name: project.name,
      owner: project.owner,
      shared: project.shared,
      created: project.created,
    };
    await ref.doc(project.id).set(newProject);
    await dispatch(addProject(newProject));
    closeModal && closeModal();
  } catch (err) {
    console.error(err);
  }
};
