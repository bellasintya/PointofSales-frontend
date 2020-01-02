import axios from 'axios';
import { logoutUser } from '../../../Helpers/Jwt'; 

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
export const logout = () => {
    const removeStorage = logoutUser();
    return {
        type: "USER_LOGOUT", 
        payload: removeStorage,
    }
}