import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import news from "./news";

export default combineReducers({
    auth,
    message,
    news,
});
