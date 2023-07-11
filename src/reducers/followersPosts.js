export default (followingPosts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_FOLLOWING_POSTS':
            return action.payload;

        default:
            return followingPosts;
    }
}