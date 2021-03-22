import { SET_TEMPO, SET_METRE, TOGGLE_IS_PLAYING } from "./types";

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
