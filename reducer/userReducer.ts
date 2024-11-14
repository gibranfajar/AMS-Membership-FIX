const initialState = {
    user: [],
    error: null,
    loading: false,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export default userReducer;