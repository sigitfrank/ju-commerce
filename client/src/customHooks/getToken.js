const getToken = ()=>{
    return {        
        userAccessToken:localStorage.getItem('userAccessToken'),
        refreshToken:localStorage.getItem('refreshToken')
    }
}

export default getToken