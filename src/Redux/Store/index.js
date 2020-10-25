import { createStore } from "redux";
import combineReducers from "../Reducers/index"
const store = createStore(combineReducers);

export default store;