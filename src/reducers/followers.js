export default (following = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_FOLLOWING':
            return action.payload;

        default:
            return following;
    }
}