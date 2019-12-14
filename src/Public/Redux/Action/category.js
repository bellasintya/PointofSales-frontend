import axios from 'axios';
// const token = localStorage.getItem('x-access-token');
// const headers = {
//     "x-access-token": token
// };

export const getCategory = (data) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'GET_CATEGORY',
        payload: axios.get('http://localhost:8080/category', { headers: headers }, { params: data })
    }
}

export const postCategory = (data) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'POST_CATEGORY',
        payload: axios.post('http://localhost:8080/category', data, { headers: headers })
    }
}

export const patchCategory = (data) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'PATCH_CATEGORY',
        payload: axios.patch(`http://localhost:8080/category/${data.id_category}`, data, { headers: headers })
    }
}

export const deleteCategory = (data) => {
    const token = localStorage.getItem('x-access-token');
    const headers = {
        "x-access-token": token
    };
    return {
        type: 'DELETE_CATEGORY',
        payload: axios.delete(`http://localhost:8080/category/${data.id_category}`, { headers: headers })
    }
}