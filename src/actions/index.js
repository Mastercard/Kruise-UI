import {
  SET_APP_DETAILS,
  SET_ERROR,
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

export function setError(message) {
  return { type: SET_ERROR, message: message };
}

export function dismissError() {
  return { type: DISMISS_ERROR };
}
