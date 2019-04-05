import {
  SET_APP_DETAILS,
  FINALIZE_APP,
  NORMALIZE_APP,
  NORMALIZED_APP,
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

import {
  ROUTE_SERVICE,
  ROUTE_INGRESS,
} from '../constants/routes';

export function submitApp(payload) {
  return function(dispatch, getState) {
    // update state from form
    dispatch(setAppDetails(payload));

    // clear validation errors
    dispatch(clearValidationErrors(payload));

    // normalize payload
    dispatch(normalizeApplication(payload));

    return validateApplication(getState().application)
      .then(validationResponse => {
        // if there are validation errors, short circuit and show errors
        if (validationResponse && Object.keys(validationResponse).length > 0) {
          dispatch(setValidationErrors(validationResponse));
          return dispatch(setError("Application is not valid"));
        }

        // no validation errors, finalize
        var dispatched = dispatch(finalizeApp(getState().application));
        if (dispatched.type === FINALIZE_APP) {
          return dispatch(goStep(ROUTE_SERVICE));
        }

        return null;
      });
  };
}

export function submitServices(payload) {
  return function(dispatch, getState) {
    // update state from form
    dispatch(setAppDetails(payload));

    // clear validation errors
    dispatch(clearValidationErrors(payload));

    // normalize payload
    dispatch(normalizeApplication(payload));

    return validateServices(getState().application)
      .then(validationResponse => {
        // if there are validation errors, short circuit and show errors
        if (Object.keys(validationResponse).length > 0) {
          dispatch(setValidationErrors(validationResponse));
          return dispatch(setError("Services are not valid"));
        }

        // no validation errors, finalize
        var dispatched = dispatch(finalizeApp(getState().application));
        if (dispatched.type === FINALIZE_APP) {
          return dispatch(goStep(ROUTE_INGRESS));
        }

        return null;
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
  };
}

export function normalizeApplication(app) {
  return {
    type: NORMALIZE_APP,
    application: app,
  };
}

export function normalizedApplication(app) {
  return {
    type: NORMALIZED_APP,
    application: app,
  };
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

function serverValidate(payload) {
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

function validateApplication(payload) {
  return serverValidate(payload)
    .then(json => {
      const appErrors = {};
      if (json.errors) {
        const { services, ...errors } = json.errors;
        return errors;
      }
      return appErrors;
    });
}

function validateServices(payload) {
  return serverValidate(payload)
    .then(json => {
      let serviceErrors = {}
      if (json.errors && json.errors.services) {
        serviceErrors = json.errors.services;
      }
      return serviceErrors;
    });
}
