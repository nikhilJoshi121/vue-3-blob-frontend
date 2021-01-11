import axios from "axios";


export function httpFile() { //Post
    return axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
        }
    });
}

export function http() { //get
    return axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json"
        }
    });
}