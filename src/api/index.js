import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('user'))?.token;


export const fetchPosts = () => axios.get(`/posts/`);
export const createPost = (newPost) => axios.post(`/posts`, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const register = (newUser) => axios.post(`/user/register`, newUser);
export const login = (user) => axios.post(`/user/login`, user);
export const getAllFollowersPosts = (userId) => axios.get(`/user/followersPosts/${userId}`);
export const getAllUsers = (id) => axios.get(`/user/getAllUsers/${id}`);
export const unfollowUser = (userId, followingId) => axios.put(`/user/updateUnFollowing`, { userId, followingId });
export const followUser = (userId, followingId) => axios.put(`/user/updateFollowing`, { userId, followingId });