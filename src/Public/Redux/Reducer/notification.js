const initialState = {
    variant: '',
    message: '',
    isOpen : false,
}

const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_NOTIFICATION':
            return {
                ...state,
                variant: action.notification.variant,
                message: action.notification.message,
                isOpen: true,
            }

        case 'CLOSE_NOTIFICATION':
            return {
                ...state,
                isOpen: false,
            }
        default:
            return state;
    }
}

export default notification;