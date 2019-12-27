import axios from 'axios';
import { getJwt } from '../../../Helpers/Jwt'; 

export const getProductList = () => {
    const jwt = getJwt();
    return {
        type: 'GET_PRODUCT_CART',
        payload: axios.get(`http://localhost:8080/product/`, { headers: {'x-access-token': jwt} })
    }
}
export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        product
    }
}
export const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        product
    }
}
export const changeQuantity = (product) => {
    return {
        type: 'CHANGE_QUANTITY_CART',
        product
    }
}
export const checkOutCart = (data) => {
    const jwt = getJwt();
    return {
        type: 'CHECKOUT_CART',
        payload: axios.post(`http://localhost:8080/transaction/`, data, { headers: {'x-access-token': jwt} })
    }
}
export const getRecentTransaction = () => {
    const jwt = getJwt();
    return {
        type: "GET_RECENT_TRANSACTION",
        payload: axios.get(`http://localhost:8080/transactions/`, { headers: {'x-access-token': jwt} })
    }
}

