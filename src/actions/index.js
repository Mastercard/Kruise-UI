import { SET_APP_DETAILS } from '../constants/actionTypes'

export function setAppDetails(payload) {
  return { type: SET_APP_DETAILS, payload };
}
