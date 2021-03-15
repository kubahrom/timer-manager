import { ADD_PROJECT, SET_PROJECTS } from '../actions/projectActions';

const initialState = {
  projects: [],
  errorMessage: {},
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};

export default projectReducer;
