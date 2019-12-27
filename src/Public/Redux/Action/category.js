import axios from 'axios';
import { getJwt } from '../../../Helpers/Jwt'; 

export const getCategory = (data) => {
    const jwt = getJwt();
    return {
        type: 'GET_CATEGORY',
        payload: axios.get('http://localhost:8080/category', { headers: {'x-access-token': jwt} }, { params: data })
    }
}

export const postCategory = (data) => {
    const jwt = getJwt();
    return {
        type: 'POST_CATEGORY',
        payload: axios.post('http://localhost:8080/category', data, { headers: {'x-access-token': jwt} })
    }
}

export const patchCategory = (data) => {
    const jwt = getJwt();
    return {
        type: 'PATCH_CATEGORY',
        payload: axios.patch(`http://localhost:8080/category/${data.id_category}`, data, { headers: {'x-access-token': jwt} })
    }
}

export const deleteCategory = (data) => {
    const jwt = getJwt();
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete(`http://localhost:8080/category/${data.id_category}`, { headers: {'x-access-token': jwt} })
    }
}