import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./slice";

const rootReducer = combineReducers({
    friends: friendsAndWannabesReducer,
});

export default rootReducer;
