import axios from "axios"

const BASE_URL = 'https://konovo.onrender.com'
const apiKey = process.env.REACT_APP_API_KEY

export function getProducts({ category = '', search = '' }) {
    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': `${apiKey}`,
        'Authorization': `Bearer ${token}`
    }

    return axios.get(`${BASE_URL}/api/products`, {
        headers: headers,
        params: {
            category,
            search
        }
    })
}