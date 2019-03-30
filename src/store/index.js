import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allowedReposMiddleware, normalizeAppMiddleware, localStorageMiddleware } from '../middleware/index'
import rootReducer from '../reducers/index'

const composeEnhancers = composeWithDevTools({
  // TODO: toggle tracing via a config?
  trace: true,
});

const reHydrateStore = () => {
  if (localStorage.getItem('application') !== null) {
    return {
      application: JSON.parse(
        localStorage.getItem('application'),
      )
    };
  }
}

const store = createStore(
  rootReducer,
  reHydrateStore(),
  composeEnhancers(
    applyMiddleware(
      thunk,
      normalizeAppMiddleware,
      allowedReposMiddleware,
      localStorageMiddleware,
    ),
  )
);

export default store;
