import AppDetails from '../AppDetails';
import Service from '../Service';
import StepPlaceholder from '../StepPlaceholder';

import { SET_APP_DETAILS } from '../constants/actionTypes';

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
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_APP_DETAILS) {
    let newState = Object.assign({}, state, { application: action.payload });
    return newState;
  }
  return state;
}

export default rootReducer;
