const initialState = {
    productList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
}

//insert initial state 
const product = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }

        case 'GET_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }

        case 'GET_PRODUCT_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                productList: action.payload.data.result
            }

        case 'POST_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }

        case 'POST_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'POST_PRODUCT_FULFILLED':
            if (action.payload.data.status === 200) {
                state.productList.push(action.payload.data.result);
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                productList: state.productList,
            }
        case 'PATCH_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'PATCH_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'PATCH_PRODUCT_FULFILLED':
            if (action.payload.data.status === 200) {
                const dataAfterPatch = state.productList.map(product => {
                    if (product.id_product === parseInt(action.payload.data.result.id_product)) {
                        return action.payload.data.result;
                    }
                    return product;
                });
                state.productList = dataAfterPatch;
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                productList: state.productList,
            }
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'DELETE_PRODUCT_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'DELETE_PRODUCT_FULFILLED':
            if (action.payload.data.status === 200) {
                const dataAfterDelete = state.productList.filter(
                    product => parseInt(product.id_product) !== parseInt(action.payload.data.id)
                );
                state.productList = dataAfterDelete
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                productList: state.productList,
            }
        default:
            return state;
    }
}

export default product;