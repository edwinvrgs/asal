import axios from 'axios';

export const baseURL = "https://api-asal.herokuapp.com/api/";

const authToken = '';

export const getConfigHeadersAuth = (config) => {
    if (
        !config?.headers?.Authorization
        || config?.headers?.Authorization === `Bearer ${authToken}`
    ) {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
};

export const api = axios.create({
    baseURL: baseURL,
    timeout: 400000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});

api.interceptors.request.use(
    (config) => getConfigHeadersAuth(config),
    (error) => {
        console.error(error);
        Promise.reject(error);
    },
);
