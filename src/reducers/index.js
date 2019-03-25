import AppDetails from '../AppDetails';
import Service from '../Service';
import StepPlaceholder from '../StepPlaceholder';

import { SET_APP_DETAILS, INVALID_REPO_URL, DISMISS_ERROR } from '../constants/actionTypes';

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
  }
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_APP_DETAILS) {
    let newState = Object.assign({}, state, { application: action.payload });
    return newState;
  }

  if (action.type === INVALID_REPO_URL) {
    return Object.assign({}, state, {
      ui: {
        ...state.ui,
        error: "Invalid Repo URL",
      }
    });
  }

  if (action.type === DISMISS_ERROR) {
    return Object.assign({}, state, {
      ui: {
        ...state.ui,
        error: null,
      }
    });
  }

  return state;
}

export default rootReducer;
