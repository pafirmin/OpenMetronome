import * as actions from "./metronomeActions";
import { SET_METRE, SET_TEMPO, TOGGLE_IS_PLAYING } from "./types";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({ tempo: 120 });

describe("Change tempo action", () => {
  it("Creates a change tempo action", () => {
    const expectedAction = { type: SET_TEMPO, payload: 80 };

    store.dispatch(actions.setTempo(80));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe("Set metre action", () => {
  it("Creates a set metre action", () => {
    const expectedAction = { type: SET_METRE, payload: 7 };

    store.dispatch(actions.setMetre(7));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe("toggle playing action", () => {
  it("Creates a tottle playing action", () => {
    const expectedAction = { type: TOGGLE_IS_PLAYING };

    store.dispatch(actions.togglePlay());
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
