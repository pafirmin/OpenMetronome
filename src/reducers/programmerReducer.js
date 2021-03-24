import {
  ADD_TO_PROGRAM,
  CLEAR_PROGRAM,
  NEXT_PROGRAM_CHUNK,
  REMOVE_FROM_PROGRAM,
} from "../actions/types";

const initialState = {
  program: [],
  currentChunk: {},
};

const programmerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_PROGRAM:
      return { ...state, program: [...state.program, payload] };
    case REMOVE_FROM_PROGRAM:
      return {
        ...state,
        program: state.program.filter((obj) => obj.id !== payload.id),
      };
    case NEXT_PROGRAM_CHUNK:
      return { ...state, currentChunk: payload };
    case CLEAR_PROGRAM:
      return initialState;
    default:
      return state;
  }
};

export default programmerReducer;
