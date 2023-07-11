import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./User/UserCard";
import { getAllUsers } from "../../actions/user";
import { useLocation } from "react-router-dom";

const UserCardParent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [counter, setCounter] = useState(0);
    const currentUser = JSON.parse(localStorage.getItem('user'))?.result?._id;
    const users = useSelector((state) => state.followers)

    useEffect(() => {
        dispatch(getAllUsers(currentUser))
    }, [currentUser, counter, location])


    return <> <div className="container"> <div className="row col-md-12" >{users?.length > 0 ? users?.map((user) => <UserCard user={user} key={user?._id} setCounter={setCounter} counter={counter} />) : <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>} </div> </div> </>
};

export default UserCardParent;