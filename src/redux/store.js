import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import projectReducer from './reducers/projectReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';
import timerReducer from './reducers/timerReducer';

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  projects: projectReducer,
  timers: timerReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
