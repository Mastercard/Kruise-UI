import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allowedReposMiddleware } from '../middleware/index'
import rootReducer from '../reducers/index'

const composeEnhancers = composeWithDevTools({
  // TODO: toggle tracing via a config?
  trace: true,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(allowedReposMiddleware, thunk),
));

export default store;
