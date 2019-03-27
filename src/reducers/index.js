import { combineReducers } from 'redux'

// components for routing
import AppDetails from '../AppDetails';
import Service from '../Service';
import StepPlaceholder from '../StepPlaceholder';

import {
  SET_APP_DETAILS,
  INVALID_REPO_URL,
  DISMISS_ERROR,
  NEXT_STEP,
} from '../constants/actionTypes';

const initialState = {
  routes: [
    { path: "/", component: AppDetails },
    { path: "/service", component: Service },
    { path: "/ingress", component: StepPlaceholder },
    { path: "/volumes", component: StepPlaceholder },
    { path: "/performance", component: StepPlaceholder},
    { path: "/health", component: StepPlaceholder},
    { path: "/container", component: StepPlaceholder},
    { path: "/optimize", component: StepPlaceholder},
    { path: "/submit", component: StepPlaceholder},
  ],
  application: {
    name: "molly-data",
    release: "v1",
    tenant: "",
    environment: "Dev",
    region: "STL",
    namespace: "",
    repoURL: "",
    path: "",
    targetRevision: "",
  },
  ui: {
    warning: null,
    error: null,
    step: "",
  }
};

export function application(state = initialState.application, action) {
  if (action.type === SET_APP_DETAILS) {
    let newState = Object.assign({}, state, action.payload);
    return newState;
  }

  return state;
}

export function ui(state = initialState.ui, action) {
  if (action.type === INVALID_REPO_URL) {
    return Object.assign({}, state, {
      error: "Invalid Repo URL",
    });
  }

  if (action.type === DISMISS_ERROR) {
    return Object.assign({}, state, {
      error: null,
    });
  }

  if (action.type === NEXT_STEP) {
    return Object.assign({}, state, {
      step: action.payload,
    });
  }

  return state;
}

export function routes(state = initialState.routes, action) {
  return state;
}

export default combineReducers({
  application,
  ui,
  routes,
});
