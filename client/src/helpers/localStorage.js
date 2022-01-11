export const setLocalStorage = (userAccessToken) => {
    localStorage.setItem('userAccessToken', userAccessToken)
    localStorage.setItem('isLoggedIn', true)
}

export const getLocalStorage = () => {
    return {
        accessToken: localStorage.getItem('userAccessToken'),
        isLoggedIn: localStorage.getItem('isLoggedIn')
    }
}

