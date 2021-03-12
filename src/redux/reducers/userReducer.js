import {
  SET_USER,
  LOG_OUT,
  USER_ERROR,
  INIT_SET_USER,
  INIT_SET_NOT_USER,
  RESET_USER_ERROR,
} from '../actions/userActions';

const initialState = {
  loggedIn: false,
  user: {},
  errorMessage: {},
  initUserLoad: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errorMessage: {},
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
        errorMessage: {},
      };
    case USER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case INIT_SET_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        errorMessage: {},
        initUserLoad: false,
      };
    case INIT_SET_NOT_USER:
      return {
        ...state,
        initUserLoad: false,
      };
    case RESET_USER_ERROR:
      return {
        ...state,
        errorMessage: {},
      };
    default:
      return state;
  }
};

export default userReducer;
