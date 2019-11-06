import axios from 'axios';

export const getCategory = (data) => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get ('http://localhost:8080/category', {params:data})
    }
}

export const postCategory = (data) => {
    return {
        type: 'POST_CATEGORY',
        payload: axios.post ('http://localhost:8080/category', data)
    }
}

export const patchCategory = (data) => {
    return {
        type: 'PATCH_CATEGORY',
        payload: axios.patch (`http://localhost:8080/category/${data.id_category}`, data)
    }
}

export const deleteCategory = (data) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete (`http://localhost:8080/category/${data.id_category}`)
    }
}

