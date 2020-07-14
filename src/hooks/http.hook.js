import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const user = {}
            user.tokens = body
            const response = await fetch(url, {method, body, headers, user})
            if (method === "DELETE") {
                return
            }
            const data = await response.json()

            if (!response.ok) {
                console.log("message: ", response)
                throw new Error(data.message || 'something goes wrong in http request')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}