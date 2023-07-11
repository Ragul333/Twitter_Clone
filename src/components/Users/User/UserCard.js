import React from "react";
import { followUser, unfollowUser } from "../../../actions/user";
import { useDispatch } from "react-redux";

const UserCard = ({ user, setCounter, counter }) => {
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem('user'))?.result?._id;
    const handleFollow = (id) => {
        let ok = window.confirm('Are you sure you want to follow ?');
        if (ok) {
            dispatch(followUser(userId, id));
            setCounter(counter + 1);
        }
    }
    const handleUnFollow = (id) => {
        let ok = window.confirm('Are you sure you want to unfollow ?');
        if (ok) {
            dispatch(unfollowUser(userId, id));
            setCounter(counter + 1);
        }

    }
    console.log("user", user)
    return <>
            <div class="card bg-light col-md-2 m-2">
                <div class="card-body">
                    <h5 class="card-title">{user?.username}</h5>
                    <div className="d-flex justify-content-around col-md-12">
                        <button className="btn btn-info btn-sm" onClick={() => handleFollow(user._id)} disabled={user?.isFollowed}>{`${user?.isFollowed ? 'Following' : 'Follow'}`}</button>
                        {user?.isFollowed ? <button className="btn btn-info btn-sm" onClick={() => handleUnFollow(user._id)}>UnFollow</button> : <></>}
                    </div>
                </div>
            </div>
    </>
}

export default UserCard;