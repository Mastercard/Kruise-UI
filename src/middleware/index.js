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
