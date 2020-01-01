export const getJwt = () => {
    return localStorage.getItem ('x-access-token');
}; 
export const getIdUser = () => {
    return localStorage.getItem ('id_user');
}; 
export const getUsername = () => {
    return localStorage.getItem ('username');
}; 
export const logoutUser = () => {
    return localStorage.removeItem("x-access-token"),
            localStorage.removeItem("id_user"),
            localStorage.removeItem("username");
}