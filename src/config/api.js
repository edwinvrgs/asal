import axios from 'axios';

export const baseURL = "https://api-asal.herokuapp.com/";
const authToken = '';

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
};

export const getConfigHeadersAuth = (config) => {
    const authToken = '';
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
        ...headers,
    },
});

api.interceptors.request.use(
    (config) => getConfigHeadersAuth(config),
    (error) => {
        console.error(error);
        Promise.reject(error);
    },
);
