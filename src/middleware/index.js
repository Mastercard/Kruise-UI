import { FINALIZE_APP, NORMALIZE_APP } from '../constants/actionTypes';
import { setError, setValidationErrors, normalizedApplication } from '../actions/index'

export function allowedReposMiddleware({ dispatch }) {
  return function(next) {
    return function (action) {

      if (action.type === FINALIZE_APP) {
        if (!action.application.repoURL.includes("bitbucket")) {
          const errMsg = "git repo URL must be a bitbucket URL";
          dispatch(setValidationErrors({ "repoURL": "errMsg" }));
          return dispatch(setError(errMsg));
        }
      }

      return next(action);
    }
  }
}

export function normalizeAppMiddleware({ dispatch, getState }) {
  return next => action => {
    const result = next(action);

    if ([ NORMALIZE_APP ].includes(result.type)) {
      const app = result.application;
      const services = app.services.map((s, i) => {
        const { ports, ...svc } = s;
        const newPorts = ports.map((p, i) => {
          let portnum = 0;
          if (p.port) {
            portnum = parseInt(p.port);
          }
          return { ...p, port: portnum };
        });
        return { ...svc, ports: newPorts };
      });
      const normalized = { ...app, services: services };
      dispatch(normalizedApplication(normalized));
      return normalized;
    }

    return result;
  };
};

export function localStorageMiddleware({ getState }) {
  return next => action => {
    const result = next(action);

    if ([ FINALIZE_APP ].includes(result.type)) {
      localStorage.setItem("application", JSON.stringify(result.application));
    }

    return result;
  };
};
