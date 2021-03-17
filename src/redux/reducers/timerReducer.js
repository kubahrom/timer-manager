import {
  ADD_TIMER,
  DELETE_TIMER,
  SET_TIMERS,
  TIMER_ERROR,
  UPDATE_TIMER,
} from '../actions/timerActions';

const initialState = {
  timers: [],
  errorMessage: '',
};

const TimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMERS:
      return {
        ...state,
        timers: action.payload,
      };
    case ADD_TIMER:
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case TIMER_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case DELETE_TIMER:
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload),
      };
    case UPDATE_TIMER:
      return {
        ...state,
        //TODO
      };
    default:
      return state;
  }
};

export default TimerReducer;
