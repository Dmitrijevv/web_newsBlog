import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // baseURL: 'https://server-m23.herokuapp.com/api/',
    timeout: 1000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    withCredentials: false,
    credentials: 'same-origin'

});

export const postApi = {
    getPost() {
        return instance.get(`posts`)
    },
    sendPost(data) {
        return instance.post(`posts`, {...data })
    }
}

export const registerApi = {
    register(data) {
        return instance.post(`registration`, {...data })
    }
}
export const loginApi = {
    login(data) {
        return instance.post(`login`, {...data })
    }
}