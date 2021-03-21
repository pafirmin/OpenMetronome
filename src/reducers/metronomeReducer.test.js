import { CHANGE_TEMPO } from "../actions/types";
import metronomeReducer from "./metronomeReducer";

describe("Metronome reducer", () => {
  it("Sets tempo on CHANGE_TEMPO action", () => {
    const action = {
      type: CHANGE_TEMPO,
      payload: 80,
    };
    const newState = metronomeReducer(null, action);

    expect(newState.tempo).toEqual(80);
  });
});
