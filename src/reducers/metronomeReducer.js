import { TOGGLE_IS_PLAYING, SET_TEMPO, SET_METRE } from "../actions/types";

const initialState = {
  tempo: 120,
  metre: 4,
  isPlaying: false,
};

const metronomeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_IS_PLAYING:
      return { ...state, isPlaying: !state.isPlaying };
    case SET_TEMPO:
      return { ...state, tempo: payload };
    case SET_METRE:
      return { ...state, metre: payload };
    default:
      return state;
  }
};

export default metronomeReducer;
