import { useNavigate } from 'react-router-dom';
import * as api from '../api';


export const register = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.register(newUser);
        dispatch({ type: 'REGISTER', payload: data })
    } catch (error) {
        alert(error?.response?.data?.message)
        console.log("error",error);
    }
}

export const login = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.login(newUser);
        dispatch({ type: 'LOGIN', payload: data })

    } catch (error) {
        alert(error?.response?.data?.message)
        console.log("error",error);
    }
}

export const getAllUsers = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAllUsers(id);
        dispatch({ type: 'FETCH_ALL_FOLLOWING', payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const followUser = (userId, followingId) => async (dispatch) => {
    try {
        const { data } = await api.followUser(userId, followingId);
        console.log("data", data);
        dispatch({ type: 'FETCH_ALL_FOLLOWING', payload: data });
    } catch (error) {
        console.log(error);
    }

}

export const unfollowUser = (userId, followingId) => async (dispatch) => {
    try {
        const { data } = await api.unfollowUser(userId, followingId);
        console.log("data", data);
        dispatch({ type: 'FETCH_ALL_FOLLOWING', payload: data });
    } catch (error) {
        console.log(error);
    }

}
