import { ADD_TO_PROGRAM, REMOVE_FROM_PROGRAM } from "./types";

export const addToProgram = (obj) => {
  return {
    type: ADD_TO_PROGRAM,
    payload: obj,
  };
};

export const removeFromProgram = (obj) => {
  return {
    type: REMOVE_FROM_PROGRAM,
    payload: obj,
  };
};
