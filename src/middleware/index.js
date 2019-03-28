import { FINALIZE_APP } from '../constants/actionTypes';
import { setError, setValidationErrors } from '../actions/index'

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

export function localStorageMiddleware({ getState }) {
  return next => action => {
    const result = next(action);

    if ([ FINALIZE_APP ].includes(result.type)) {
      localStorage.setItem("application", JSON.stringify(getState().application));
    }

    return result;
  };
};
