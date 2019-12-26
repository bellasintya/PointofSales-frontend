import axios from 'axios';

export const getProductList = () => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'GET_PRODUCT_CART',
        payload: axios.get(`http://localhost:8080/product/`, { headers: headers })
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
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'CHECKOUT_CART',
        payload: axios.post(`http://localhost:8080/transaction/`, data, { headers: headers })
    }
}

