import {API} from "../config/api";

export const signUp = (data) => {
    try {
        return API.post("auth/signup", data);
    } catch (e) {
        console.log('Error in Sign Up service');
        console.log(e);
    }
}

export const login = async (data) => {
    try {
        const response = await API.post("auth/login", data);

        localStorage.setItem('user', JSON.stringify(response.data));

        return response;
    } catch (e) {
        console.log('Error in Login service');
        return e;
    }
}

export const logout = async () => {
    try {
        const response = await API.get("auth/logout");

        localStorage.removeItem('user');

        return response;
    } catch (e) {
        console.log('Error in Logout service');
        console.log(e);
    }
}

export const getUserInfoFetch = async () => {
    try {
        return await API.get("auth/user");
    } catch (e) {
        console.log('Error getting the user information');
        return e;
    }
}

export const updateUserInfoPut = async (data) => {
    try {
        const response = await API.put("user", data);

        return response;
    } catch (e) {
        console.log('Error getting the user information');
        return e;
    }
}
