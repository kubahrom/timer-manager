import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
