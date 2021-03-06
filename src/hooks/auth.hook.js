import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userType, setUserType] = useState(null)

    const login = useCallback((jwtToken, id, type) => {
        setToken(jwtToken)
        setUserId(id)
        setUserType(type)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userType: type
        }))
    }, [])


    const logout = useCallback(() => {
        console.log("Log out")
        setToken(null)
        setUserId(null)
        setUserType(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.userType)
        }
        setReady(true)
    }, [login])


    return { login, logout, token, userId, ready, userType }
}