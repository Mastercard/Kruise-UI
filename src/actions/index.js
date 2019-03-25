import {
  SET_APP_DETAILS,
  INVALID_REPO_URL,
  DISMISS_ERROR,
} from '../constants/actionTypes';

export function setAppDetails(payload) {
  return { type: SET_APP_DETAILS, payload };
}

export function invalidRepoURL() {
  return { type: INVALID_REPO_URL };
}

export function dismissError() {
  return { type: DISMISS_ERROR };
}
