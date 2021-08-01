import axios from 'axios';

export const baseURL = "https://api-asal.herokuapp.com/api/";

export const getConfig = (config) => {
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;

    if (user) {
        config.headers.Authorization = `${user.token_type} ${user.access_token}`;
    }

    return config;
};

export const API = axios.create({
    baseURL: baseURL,
    timeout: 400000,
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    (config) => getConfig(config),
    (error) => {
        console.error(error);
        Promise.reject(error);
    },
);
