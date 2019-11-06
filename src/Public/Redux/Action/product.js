import axios from 'axios';

export const getProduct = () => {
    return {
        type: 'GET_PRODUCT',
        payload: axios.get ('http://localhost:8080/product') 
    }
}
export const postProduct = (form) => {
    return {
        type: 'POST_PRODUCT',
        payload: axios.post ('http://localhost:8080/product', form)
    }
}
export const patchProduct = (form) => {
    return {
        type: 'PATCH_PRODUCT',
        payload: axios.patch (`http://localhost:8080/product/${form.id_product}`, form)
    }
}
export const deleteProduct = (form) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: axios.delete (`http://localhost:8080/product/${form.id_product}`)
    }
}