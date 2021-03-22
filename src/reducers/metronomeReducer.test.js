import { SET_TEMPO, SET_METRE, TOGGLE_IS_PLAYING } from "../actions/types";
import metronomeReducer from "./metronomeReducer";

describe("Metronome reducer", () => {
  it("Sets tempo on SET_TEMPO action", () => {
    const action = {
      type: SET_TEMPO,
      payload: 80,
    };
    const newState = metronomeReducer(null, action);

    expect(newState.tempo).toEqual(80);
  });

  it("Sets time signature change on SET_METRE", () => {
    const action = {
      type: SET_METRE,
      payload: 7,
    };
    const newState = metronomeReducer(null, action);

    expect(newState.metre).toEqual(7);
  });

  it("Toggles metronome on TOGGLE_IS_PLAYING", () => {
    const action = {
      type: TOGGLE_IS_PLAYING,
    };
    const state = { isPlaying: false };
    const newState = metronomeReducer(state, action);
    expect(newState.isPlaying).toBe(true);
  });
});
