import { ADD_TO_PROGRAM, REMOVE_FROM_PROGRAM } from "../actions/types";
import programmerReducer from "./programmerReducer";

describe("programmer reducer", () => {
  it("Adds new options on 'ADD_TO_PROGRAM'", () => {
    const initialState = [];
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

    expect(newState).toContainEqual(action.payload);
  });

  it("Removes program on REMOVE_FROM_PROGRAM", () => {
    const initialState = [
      {
        measures: 4,
        metre: 4,
        tempo: 120,
        silent: false,
        id: 123,
      },
    ];
    const action = {
      type: REMOVE_FROM_PROGRAM,
      payload: { id: 123 },
    };

    const newState = programmerReducer(initialState, action);
    expect(newState.length).toBe(0);
  });
});
