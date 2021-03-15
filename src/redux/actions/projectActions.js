import firebase from '../../firebase/firebase';

//Actions
export const SET_PROJECTS = 'SET_projects';
export const ADD_PROJECT = 'add_project';
export const DELETE_PROJECT = 'delete_project';

//Set project action creator
const setProjects = payload => ({ type: SET_PROJECTS, payload });

//Add project action creator
const addProject = payload => ({ type: ADD_PROJECT, payload });

//Set projects based on user
export const getProjects = () => dispatch => {
  dispatch(setProjects());
};

//Add new project
export const createNewProject = project => async dispatch => {
  try {
    const ref = firebase.firestore().collection('projects');
    const newProject = {
      id: project.id,
      name: project.name,
      owner: project.owner,
      shared: project.shared,
    };
    await ref.doc(project.id).set(newProject);
    await dispatch(addProject(newProject));
  } catch (err) {
    console.log(err);
  }
};
