import axios from "axios"

const BASE_URL = 'https://zadatak.konovo.rs'

export function login(username, password) {
    return axios.post(`${BASE_URL}/login`, {
        username: username,
        password: password
    })
}