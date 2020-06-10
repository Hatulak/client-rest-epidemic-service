import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import news from "./news";
import users from "./users";
import category from "./category";

export default combineReducers({
    auth,
    message,
    news,
    category,
    users,
});
