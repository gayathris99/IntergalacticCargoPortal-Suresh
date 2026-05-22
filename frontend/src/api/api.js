// Keep ALl api endpoints here

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    // To send accessToken which is in cookies
    withCredentials: true
})

// All apis will return the response and errors, when we use in template files
api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response?.data?.message || 'Something went wrong')
)


// Authentication Apis
export const signup = (email, password) => {
    return api.post('/auth/signup', {
        email, password
    })
}

export const login = (email, password) => {
    return api.post('/auth/login', {
        email, password
    })
}

export const logout = () => {
    return api.post('/auth/logout')
}

// Cargo related API
export const uploadManifest = (file) => {
    const formData = new FormData()
    formData.append('manifest', file)
    return api.post('/api/upload', formData, {
        headers: {
           'Content-Type': 'multipart/form-data' 
        }
    })
}
export const getCargo = () => {
    return api.get('/api/cargo')
}

export default api