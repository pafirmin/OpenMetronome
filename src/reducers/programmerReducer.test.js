import {
  ADD_TO_PROGRAM,
  CLEAR_PROGRAM,
  REMOVE_FROM_PROGRAM,
} from "../actions/types";
import programmerReducer from "./programmerReducer";

describe("programmer reducer", () => {
  it("Adds new options on 'ADD_TO_PROGRAM'", () => {
    const initialState = { program: [], currentChunk: {} };
    const action = {
      type: ADD_TO_PROGRAM,
      payload: {
        measures: 4,
        metre: 4,
        tempo: 120,
        silent: false,
      },
    };

    const newState = programmerReducer(initialState, action);

    expect(newState.program).toContainEqual(action.payload);
  });

  it("Removes program on REMOVE_FROM_PROGRAM", () => {
    const initialState = {
      program: [
        {
          measures: 4,
          metre: 4,
          tempo: 120,
          silent: false,
          id: 123,
        },
      ],
      currentChunk: {},
    };
    const action = {
      type: REMOVE_FROM_PROGRAM,
      payload: { id: 123 },
    };

    const newState = programmerReducer(initialState, action);
    expect(newState.program.length).toBe(0);
  });

  it("Clears state on CLEAR_PROGRAM", () => {
    const initialState = {
      program: [
        {
          measures: 4,
          metre: 4,
          tempo: 120,
          silent: false,
          id: 123,
        },
        {
          measures: 4,
          metre: 3,
          tempo: 120,
          silent: false,
          id: 456,
        },
      ],
      currentChunk: {
        measures: 4,
        metre: 3,
        tempo: 120,
        silent: false,
        id: 456,
      },
    };

    const action = { type: CLEAR_PROGRAM };

    const newState = programmerReducer(initialState, action);
    expect(newState.program).toHaveLength(0);
    expect(newState.currentChunk).toEqual({});
  });
});
