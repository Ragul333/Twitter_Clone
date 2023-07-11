import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    let userId = JSON.parse(localStorage.getItem('user'));

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    let loading = false;
    const dispatch = useDispatch();
    const url = "https://api.cloudinary.com/v1_1/drpwuzvax/auto/upload";
    const [postData, setPostData] = useState({ content: '', mediaFile: '', user: userId?.result?._id , creator: userId?.result?.username});
    const handleImageUpload = (data) => {
        loading = true;
        delete axios.defaults.headers.common["Authorization"];
        const instance = axios.create()
        const formData = new FormData();
        formData.append("file", data);
        formData.append("upload_preset", "nahowflp");
        instance.post(url, formData)
            .then(function (response) {
                setPostData({ ...postData, mediaFile: response.data.url })
                console.log(response);
                axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('user'))?.token;
                loading = false;
            })
            .catch(function (error) {
                console.log(error);
                loading = false;
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
            setCurrentId(null);
        } else {
            dispatch(createPost(postData));
        }
        setPostData({ content: '', mediaFile: '', user: userId?.result?._id, creator: userId?.result?.username });
        document.getElementById('gridCheck').value = null;
    }

    useEffect(() => {
        if (currentId) {
            setPostData(post);
        }
    }, [currentId])
    console.log(JSON.parse(localStorage.getItem('user')))
    return <div className='col-md-10 mt-2 mx-auto' style={{ border: '1px solid #808080', padding: '10px' }}>
        <form class="row col-md-12 g-3">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" value={postData?.content} id="floatingTextarea" onChange={(e) => setPostData({ ...postData, content: e.target.value })}></textarea>
                <label for="floatingTextarea">What is happening ?</label>
            </div>
            <div class="col-12">
                <div class="form-check">
                    {
                        loading ? <div class="spinner-border text-warning" role="status">
                            <span class="visually-hidden">UpLoading...</span>
                        </div> :
                            <input type='file' id="gridCheck" onChange={(e) => handleImageUpload(e.target.files[0])} />
                    }
                </div>
            </div>
            <div className='col-md-4'></div>
            <div class="col-md-4">
                <button type="submit" class="btn btn-info" onClick={handleSubmit}>{`${currentId ? 'Update' : 'Post'} Tweet`}</button>
            </div>
        </form>
    </div>
}

export default Form;