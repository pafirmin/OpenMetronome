import {
  TOGGLE_IS_PLAYING,
  SET_TEMPO,
  SET_METRE,
  INCREMENT_BEAT_COUNT,
  RESET_BEAT_COUNT,
  NEXT_PROGRAM_CHUNK,
  SET_NOTE_VALUE,
} from "../actions/types";

const initialState = {
  tempo: 120,
  metre: 4,
  noteValue: 1,
  isPlaying: false,
  beatCount: 0,
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
    case SET_NOTE_VALUE:
      return { ...state, noteValue: payload };
    case INCREMENT_BEAT_COUNT:
      return { ...state, beatCount: state.beatCount + 1 };
    case RESET_BEAT_COUNT:
      return { ...state, beatCount: 0 };
    case NEXT_PROGRAM_CHUNK:
      return {
        ...state,
        tempo: payload.tempo,
        metre: payload.metre,
        beatCount: 0,
      };
    default:
      return state;
  }
};

export default metronomeReducer;
