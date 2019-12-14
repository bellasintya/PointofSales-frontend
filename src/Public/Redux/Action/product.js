import axios from 'axios';

export const getProduct = () => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'GET_PRODUCT',
        payload: axios.get('http://localhost:8080/product', { headers: headers })
    }
}
export const postProduct = (form) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'POST_PRODUCT',
        payload: axios.post('http://localhost:8080/product',form, { headers: headers })
    }
}
export const patchProduct = (form) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'PATCH_PRODUCT',
        payload: axios.patch(`http://localhost:8080/product/${form.id_product}`, form, { headers: headers })
    }
}
export const deleteProduct = (form) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete(`http://localhost:8080/product/${form.id_product}`, { headers: headers })
    }
}