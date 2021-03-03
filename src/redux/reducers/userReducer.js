import {
  SET_USER,
  LOG_OUT,
  USER_ERROR,
  INIT_SET_USER,
  INIT_SET_NOT_USER,
} from '../actions/userActions';

const initialState = {
  loggedIn: false,
  userId: {},
  errorMessage: {},
  initUserLoad: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload,
        errorMessage: {},
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        userId: {},
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
        userId: action.payload,
        errorMessage: {},
        initUserLoad: false,
      };
    case INIT_SET_NOT_USER:
      return {
        ...state,
        initUserLoad: false,
      };
    default:
      return state;
  }
};

export default userReducer;
