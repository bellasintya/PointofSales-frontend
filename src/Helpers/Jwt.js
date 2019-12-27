export const getJwt = () => {
    return localStorage.getItem ('x-access-token');
}; 
export const getIdUser = () => {
    return localStorage.getItem ('id_user');
}; 
export const getUsername = () => {
    return localStorage.getItem ('username');
}; 