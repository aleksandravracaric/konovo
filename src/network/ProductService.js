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

export function getProductById(productId) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': `${apiKey}`,
    };
    return axios.get(`${BASE_URL}/api/products/${productId}`, {
        headers: headers
    });

}
