import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allowedReposMiddleware } from '../middleware/index'
import rootReducer from '../reducers/index'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(allowedReposMiddleware),
));


export default store;
