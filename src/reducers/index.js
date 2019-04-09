import { combineReducers } from 'redux'

// components for routing
import AppDetails from '../AppDetails';
import Service from '../Service';
import Ingress from '../Ingress';
import Container from '../Container';
import StepPlaceholder from '../StepPlaceholder';

import {
  SET_APP_DETAILS,
  SET_VALIDATION_ERRORS,
  CLEAR_VALIDATION_ERROR,
  NORMALIZED_APP,
  SET_ERROR,
  DISMISS_ERROR,
  NEXT_STEP,
  TOGGLE_PREVIEW,
  TOGGLE_PREVIEW_ENABLED,
  SET_PREVIEW_CONTENT,
  ADD_SERVICE,
  DELETE_SERVICE,
} from '../constants/actionTypes';

import {
  ROUTE_APP_DETAILS,
  ROUTE_SERVICE,
  ROUTE_INGRESS,
  // ROUTE_VOLUMES,
  // ROUTE_PERFORMANCE,
  // ROUTE_HEALTH,
  ROUTE_CONTAINER,
  // ROUTE_OPTIMIZE,
  ROUTE_SUBMIT,
} from '../constants/routes';

const initialState = {
  routes: [
    { name: "App Details", path: ROUTE_APP_DETAILS, component: AppDetails },
    { name: "Service", path: ROUTE_SERVICE, component: Service },
    { name: "Ingress", path: ROUTE_INGRESS, component: Ingress },
    // { name: "Volumes", path: ROUTE_VOLUMES, component: StepPlaceholder },
    // { name: "Performance", path: ROUTE_PERFORMANCE, component: StepPlaceholder},
    // { name: "Health", path: ROUTE_HEALTH, component: StepPlaceholder},
    { name: "Container", path: ROUTE_CONTAINER, component: Container},
    // { name: "Optimize", path: ROUTE_OPTIMIZE, component: StepPlaceholder},
    { name: "Submit", path: ROUTE_SUBMIT, component: StepPlaceholder},
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
    services: [],
  },
  ui: {
    warning: null,
    error: null,
    step: "",
    validationErrors: {},
    showPreview: false,
    previewEnabled: false,
    previewContent: "",
  }
};

export function application(state = initialState.application, action) {
  if (action.type === SET_APP_DETAILS) {
    let newState = Object.assign({}, state, action.payload);
    return newState;
  }

  if (action.type === ADD_SERVICE) {
    return {
      ...state,
      services: [...state.services, action.payload],
    };
  }

  if (action.type === DELETE_SERVICE) {
    return {
      ...state,
      services: [
        ...state.services.slice(0, action.payload),
        ...state.services.slice(action.payload + 1),
      ],
    };
  }

  if (action.type === NORMALIZED_APP) {
    return action.application;
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
    let errs = Object.assign({}, state.validationErrors);

    action.payload.forEach((k) => {
      if (errs.hasOwnProperty(k)) {
        errs = errs[k];
      }
    });

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

  if (action.type === SET_PREVIEW_CONTENT) {
    return Object.assign({}, state, { previewContent: action.payload });
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
