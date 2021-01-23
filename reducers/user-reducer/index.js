import {
    USER_DATA
} from "../../actions/types";

const INITIAL_STATE = {
  user: {
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DATA:
      debugger
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
}