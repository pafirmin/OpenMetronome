import * as actions from "./metronomeActions";
import { CHANGE_TEMPO } from "./types";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({ tempo: 120 });

describe("Change tempo action", () => {
  it("Creates a change tempo action", () => {
    const expectedAction = { type: CHANGE_TEMPO, payload: 80 };

    store.dispatch(actions.changeTempo(80));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
