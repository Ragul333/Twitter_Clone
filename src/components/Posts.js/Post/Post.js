import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { deletePost } from "../../../actions/posts";

const Post = ({ data, setCurrentId, isFollowerPost }) => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        let ok = window.confirm('Are you sure you want to delete ?');
        if (ok) {
            dispatch(deletePost(id));
            setCurrentId(null);
        }
    }
    let imageOrVideo = data?.mediaFile;
    console.log('imageOrVideo', imageOrVideo.substr(imageOrVideo.length - 3))
    return <div className="col-md-6 mt-4 mx-auto">
        <div class="card">
            <div className="d-flex p-2 justify-content-between">
                <p className="fw-bold text-left">{data?.creator}</p>
                <p className="fw-light" >{moment(data?.createdAt).fromNow(true)}
                    {isFollowerPost ? <></> : <div class="dropdown d-inline">
                        <span className="fw-bold p-2 cursor" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> : </span>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="cursor dropdown-item" onClick={() => setCurrentId(data._id)}>Edit</a></li>
                            <li><a class="cursor dropdown-item" onClick={() => handleDelete(data._id)}>Delete</a></li>
                        </ul>
                    </div>}
                </p>
            </div>
            <div class="card-body" style={{ marginTop: '-5%' }}>
                <p class="card-text">{data.content}</p>
            </div>
            {
                data?.mediaFile.substr(data?.mediaFile?.length - 3) === 'mp4' ? <video controls autoplay>
                    <source src={`${data.mediaFile}`} type="video/mp4" />
                </video>
                    :
                    <img src={data.mediaFile ? data.mediaFile : ''} class="card-img-top" alt="..." />

            }
        </div>
    </div>
}

export default Post;