import { combineReducers } from "redux";
import friendsAndWannabesReducer from "./slice";
import messagesReducer from "./messages/slice";

const rootReducer = combineReducers({
    friends: friendsAndWannabesReducer,
    messages: messagesReducer,
});

export default rootReducer;