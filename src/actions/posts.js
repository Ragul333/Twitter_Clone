import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
        console.log('in axios',data)
    } catch (error) {
        console.log(error);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const updatePost = (id, updatePost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatePost);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const getAllFollowersPosts = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllFollowersPosts(id);
        dispatch({ type: 'FETCH_ALL_FOLLOWING_POSTS', payload: data });
    } catch (error) {
        console.log(error);
    }
}
