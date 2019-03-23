import { SET_NAME } from '../constants/actionTypes';

const initialState = {
  application: {
    name: "heyo",
    release: "v1",
  },
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_NAME) {
    let newState = Object.assign({}, state, {
      application: {
        ...state.application,
        name: action.payload
      }
    });
    return newState;
  }
  return state;
}

export default rootReducer;
