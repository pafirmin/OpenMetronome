import metronomeReducer from "../reducers/metronomeReducer";
import { createStore } from "redux";

const store = createStore(metronomeReducer);

export default store;
