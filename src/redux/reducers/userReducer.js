import { SET_USER, LOG_OUT, USER_ERROR } from '../actions/userActions';

const initialState = {
  loggedIn: false,
  userId: {},
  errorMessage: {},
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
    default:
      return state;
  }
};

export default userReducer;
