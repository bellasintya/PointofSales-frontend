import axios from 'axios';
import { getJwt } from '../../../Helpers/Jwt'; 

export const getProduct = () => {
    const jwt = getJwt();
    return {
        type: 'GET_PRODUCT',
        payload: axios.get('http://localhost:8080/product', { headers: {'x-access-token': jwt} })
    }
}
export const postProduct = (form) => {
    const jwt = getJwt();
    return {
        type: 'POST_PRODUCT',
        payload: axios.post('http://localhost:8080/product', form, { headers: {'x-access-token': jwt} })
    }
}
export const patchProduct = (form) => {
    const jwt = getJwt();
    return {
        type: 'PATCH_PRODUCT',
        payload: axios.patch(`http://localhost:8080/product/${form.id_product}`, form, { headers: {'x-access-token': jwt} })
    }
}
export const deleteProduct = (form) => {
    const jwt = getJwt();
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete(`http://localhost:8080/product/${form.id_product}`, { headers: {'x-access-token': jwt}})
    }
}