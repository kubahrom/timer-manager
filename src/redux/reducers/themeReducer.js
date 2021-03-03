import { SWITCH_THEME } from '../actions/themeActions';

const initialState = { darkTheme: true };

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      return {
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
};

export default themeReducer;
