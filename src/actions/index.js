import {
  SET_APP_DETAILS,
  FINALIZE_APP,
  SET_VALIDATION_ERRORS,
  CLEAR_VALIDATION_ERROR,
  SET_ERROR,
  DISMISS_ERROR,
  NEXT_STEP,
  TOGGLE_PREVIEW,
  TOGGLE_PREVIEW_ENABLED,
  SET_PREVIEW_CONTENT,
  ADD_SERVICE,
  DELETE_SERVICE,
} from '../constants/actionTypes';

export function submitApp(payload) {
  return function(dispatch, getState) {
    // update state from form
    dispatch(setAppDetails(payload));

    // clear validation errors
    dispatch(clearValidationErrors(payload));

    return validateApplication(payload)
      .then(validationResponse => {
        // if there are validation errors, short circuit and show errors
        if (validationResponse.errors && Object.keys(validationResponse.errors).length > 0) {
          dispatch(setValidationErrors(validationResponse.errors));
          return dispatch(setError("Application is not valid"));
        }

        // no validation errors, finalize
        var dispatched = dispatch(finalizeApp(getState().application));
        if (dispatched.type === FINALIZE_APP) {
          dispatch(goStep("/service"));
        }
      });
  };
}

export function canPreview(payload) {
  return function(dispatch, getState) {
    return validateApplication(payload)
      .then(validationResponse => {
        // if there are validation errors, preview is disabled
        const errs = validationResponse.errors;
        dispatch(togglePreviewEnabled(!errs || Object.keys(errs).length === 0));
      });
  };
}

export function finalizeApp(app) {
  return {
    type: FINALIZE_APP,
    application: app,
  }
}

export function clearValidationErrors(errors) {
  return {
    type: SET_VALIDATION_ERRORS,
    errors: {},
  };
}

export function clearValidationError(field) {
  return {
    type: CLEAR_VALIDATION_ERROR,
    field: field,
  };
}

export function setValidationErrors(errors) {
  return {
    type: SET_VALIDATION_ERRORS,
    errors: errors,
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

export function showPreview() {
  return function(dispatch, getState) {

    // TODO: configurable api server
    // TODO: error handling
    return fetch("http://localhost:9801/apps", {
      method: "post",
      body: JSON.stringify(getState().application),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.text())
      .then(payload => {
        dispatch(setPreviewContent(payload));
        dispatch(togglePreview(true));
      })
  }
}

export function togglePreview(show) {
  return { type: TOGGLE_PREVIEW, show };
}

export function togglePreviewEnabled(show) {
  return { type: TOGGLE_PREVIEW_ENABLED, show };
}

export function setPreviewContent(content) {
  return { type: SET_PREVIEW_CONTENT, payload: content };
}

export function addService(service) {
  return { type: ADD_SERVICE, payload: service };
}

export function deleteService(idx) {
  return { type: DELETE_SERVICE, payload: idx };
}

function validateApplication(payload) {
  // run server side validation
  // TODO: configurable api server
  // TODO: error handling
  return fetch("http://localhost:9801/validates/application", {
    method: "post",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json());
}
