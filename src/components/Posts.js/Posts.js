import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    return <>{
        posts.length > 0 ? posts.map((data) =>
            <div className="container">
                <Post data={data} setCurrentId={setCurrentId} />
            </div>
        )
            :
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
    }
    </>
}

export default Posts;