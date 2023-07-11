import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Posts.js/Post/Post";
import { getAllFollowersPosts } from "../../actions/posts";

const FollowersPost = () => {
    const id = JSON.parse(localStorage.getItem('user'))?.result?._id;
    const dispatch = useDispatch();
    console.log("id", id, id?.length)
    useEffect(() => {
        if (id?.length > 0) {
            dispatch(getAllFollowersPosts(id))
        }
    }, [id])

    const posts = useSelector((state) => state.followersPosts);

    return <>
        <div className="container">
            {
                posts.length > 0 ? posts.map((data) =>
                    <div className="row col-md-10 mx-auto">
                        <Post data={data} isFollowerPost={true} />
                    </div>
                )
                    :
                    <div class="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
            }
        </div>
    </>
}

export default FollowersPost;