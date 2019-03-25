import { SET_APP_DETAILS } from '../constants/actionTypes';
import { invalidRepoURL } from '../actions/index'

export function allowedReposMiddleware({ dispatch }) {
  return function(next) {
    return function (action) {

      if (action.type === SET_APP_DETAILS) {
        if (!action.payload.repoURL.includes("bitbucket")) {
          return dispatch(invalidRepoURL());
        }
      }

      return next(action);
    }
  }
}
