const initialState = {
    variant: '',
    message: '',
    isOpen : false,
    isClosed: false,
}

//insert initial state 
const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_NOTIFICATION':
            return {
                ...state,
                variant: action.notification.variant,
                message: action.notification.message,
                isOpen: true,
                isClosed: false,
            }

        case 'CLOSE_NOTIFICATION':
            return {
                ...state,
                isClosed: true,
            }
        default:
            return state;
    }
}

export default notification;