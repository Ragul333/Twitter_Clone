export default (state = { authData: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify({ ...action.payload }))
            return { ...state, authData: action.payload };
        case 'REGISTER':
            return { ...state, authData: null };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null };

        default:
            return state;
    }
}