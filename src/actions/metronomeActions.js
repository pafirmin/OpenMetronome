import { CHANGE_TEMPO } from "./types";

export const changeTempo = (tempo) => {
  return {
    type: CHANGE_TEMPO,
    payload: tempo,
  };
};
