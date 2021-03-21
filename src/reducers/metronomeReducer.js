import { CHANGE_TEMPO } from "../actions/types";

const initialState = {
  tempo: 120,
};

const metronomeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_TEMPO:
      return { ...state, tempo: payload };
    default:
      return state;
  }
};

export default metronomeReducer;
