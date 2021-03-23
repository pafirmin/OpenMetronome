import { ADD_TO_PROGRAM, REMOVE_FROM_PROGRAM } from "../actions/types";

const initialState = [];

const programmerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_PROGRAM:
      return [...state, payload];
    case REMOVE_FROM_PROGRAM:
      return state.filter((obj) => obj.id !== payload.id);
    default:
      return state;
  }
};

export default programmerReducer;
