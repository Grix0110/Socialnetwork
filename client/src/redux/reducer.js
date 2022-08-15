import { combineReducers } from "redux";
import FriendsAndWannabesReducer from "./slice";

const rootReducer = combineReducers({
    friends: FriendsAndWannabesReducer,
});

export default rootReducer;
