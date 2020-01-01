export const openNotification = (notification) => {
    return {
        type: 'OPEN_NOTIFICATION',
        notification
    }
}
export const closeNotification = (notification) => {
    return {
        type: 'CLOSE_NOTIFICATION',
        notification
    }
}