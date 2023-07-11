import { combineReducers } from "redux";
import posts from './posts';
import users from './users';
import followers from './followers';
import followersPosts from './followersPosts';

export default combineReducers({
    posts,
    users,
    followers,
    followersPosts
});