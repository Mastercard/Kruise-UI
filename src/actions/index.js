import { SET_NAME } from '../constants/actionTypes'

export function setName(payload) {
  return { type: SET_NAME, payload };
}
