import { combineReducers } from 'redux'

// components for routing
import AppDetails from '../AppDetails';
import Service from '../Service';
import StepPlaceholder from '../StepPlaceholder';

import {
  SET_APP_DETAILS,
  SET_VALIDATION_ERRORS,
  CLEAR_VALIDATION_ERROR,
  SET_ERROR,
  DISMISS_ERROR,
  NEXT_STEP,
  TOGGLE_PREVIEW,
  TOGGLE_PREVIEW_ENABLED,
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
    name: "",
    release: "",
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
    validationErrors: {},
    showPreview: false,
    previewEnabled: false,
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
  if (action.type === SET_ERROR) {
    return Object.assign({}, state, {
      error: action.message,
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
      error: null, // dismiss error when navigating away
    });
  }

  if (action.type === SET_VALIDATION_ERRORS) {
    const errs = action.errors;
    return Object.assign({}, state, {
      validationErrors: errs,
      previewEnabled: (!errs || Object.keys(errs).length === 0),
    });
  }

  if (action.type === CLEAR_VALIDATION_ERROR) {
    var errs = Object.assign({}, state.validationErrors);
    delete errs[action.field];
    return Object.assign({}, state, {
      validationErrors: errs,
      previewEnabled: (!errs || Object.keys(errs).length === 0),
    });
  }

  if (action.type === TOGGLE_PREVIEW) {
    return Object.assign({}, state, { showPreview: action.show });
  }

  if (action.type === TOGGLE_PREVIEW_ENABLED) {
    return Object.assign({}, state, { previewEnabled: action.show });
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
