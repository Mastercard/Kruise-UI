import {
  SET_APP_DETAILS,
  INVALID_REPO_URL,
  DISMISS_ERROR,
  NEXT_STEP,
} from '../constants/actionTypes';

export function submitApp(payload) {
  return function(dispatch, getState) {
    return fetch("http://localhost:9801/validates/application", {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        var dispatched = dispatch(setAppDetails(payload));

        // SET_APP_DETAILS was not skipped in middleware, let's proceed
        if (dispatched.type === SET_APP_DETAILS) {
          dispatch(dismissError());
          dispatch(goStep("/service"));
        }
      })
  };
}

export function setAppDetails(payload) {
  return {
    type: SET_APP_DETAILS,
    payload,
  };
}

export function goStep(path) {
  return {
    type: NEXT_STEP,
    payload: path,
  };
}

export function invalidRepoURL() {
  return { type: INVALID_REPO_URL };
}

export function dismissError() {
  return { type: DISMISS_ERROR };
}
