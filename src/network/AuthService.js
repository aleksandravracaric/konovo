import axios from "axios"

const BASE_URL = 'https://konovo.onrender.com'
// https://zadatak.konovo.rs/login -> CORS nije podesen
const apiKey = process.env.REACT_APP_API_KEY

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': `${apiKey}`,
}

export function login(username, password) {
    return axios.post(`${BASE_URL}/api/login`, {
        username: username,
        password: password
    }, {
        headers: headers
    })
}