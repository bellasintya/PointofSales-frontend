const initialState = {
    categoryList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: action.payload.data.result
            }
        case 'POST_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }

        case 'POST_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_CATEGORY_FULFILLED':
            if (action.payload.data.status === 200) {
                state.categoryList.push(action.payload.data.result);
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: state.categoryList,
            }
        case 'PATCH_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'PATCH_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'PATCH_CATEGORY_FULFILLED':
            if (action.payload.data.status === 200) {
                const dataAfterPatch = state.categoryList.map(category => {
                    if (category.id_category === parseInt(action.payload.data.result.id_category)) {
                        return action.payload.data.result;
                    }
                    return category;
                });
                state.categoryList = dataAfterPatch;
            } 
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: state.categoryList,
            }
        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_CATEGORY_FULFILLED':
            if (action.payload.data.status === 200) {
                const dataAfterDelete = state.categoryList.filter(
                    category => category.id_category !== parseInt(action.payload.data.result.id_category)
                );
                state.categoryList = dataAfterDelete;
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: state.categoryList,
            }
        default:
            return state;
    }
}

export default category;