import axios from 'axios';

export const loginUser = (form) => {
    return {
        type: 'POST_USER',
        payload: axios.post ('http://localhost:8080/user/login', form) 
    } 
}
export const registerUser = (form) => {
    return {
        type: 'POST_REGISTER',
        payload: axios.post ('http://localhost:8080/user/register', form) 
    } 
}