import {
  SET_TEMPO,
  SET_METRE,
  TOGGLE_IS_PLAYING,
  INCREMENT_BEAT_COUNT,
  RESET_BEAT_COUNT,
  NEXT_PROGRAM_CHUNK,
} from "./types";

export const setTempo = (tempo) => {
  return {
    type: SET_TEMPO,
    payload: tempo,
  };
};

export const setMetre = (meter) => {
  return {
    type: SET_METRE,
    payload: meter,
  };
};

export const togglePlay = () => {
  return { type: TOGGLE_IS_PLAYING };
};

export const incrementBeatCount = (val) => {
  return { type: INCREMENT_BEAT_COUNT, payload: val };
};

export const resetBeatCount = () => {
  return { type: RESET_BEAT_COUNT };
};

export const nextProgramChunk = (obj) => {
  return {
    type: NEXT_PROGRAM_CHUNK,
    payload: obj,
  };
};
