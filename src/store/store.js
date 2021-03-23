import metronomeReducer from "../reducers/metronomeReducer";
import { combineReducers, createStore } from "redux";
import programmerReducer from "../reducers/programmerReducer";

const rootReducer = combineReducers({
  metronome: metronomeReducer,
  program: programmerReducer,
});

const store = createStore(rootReducer);

export default store;
