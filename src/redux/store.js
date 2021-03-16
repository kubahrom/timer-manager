import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import projectReducer from './reducers/projectReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  projects: projectReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
