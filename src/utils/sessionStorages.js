const setToken = (token) => sessionStorage.setItem('token', token)

const getToken = () => {
    const token = sessionStorage.getItem('token')
    if(token !== undefined)
        return token
}

const setUserData = (userData) => sessionStorage.setItem('user', JSON.stringify(userData))

const getUserData = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user !== undefined ) {
        return  user
    } else {
        return ''
    }
}

export { setUserData, getUserData, setToken, getToken }