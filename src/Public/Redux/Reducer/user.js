const initialState = {
    loginResponse: {},
    registerResponse: {},
    userList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    responseStatus: '',
    responseMessage:'',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data
            }
        case 'POST_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data,
            }
        case 'POST_REGISTER_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_REGISTER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_REGISTER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                registerResponse: action.payload.data,
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                userList: null
            };
        default:
            return state;
    }
}

export default user;