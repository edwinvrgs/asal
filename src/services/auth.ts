import {API} from "../config/api";

export const signUp = async (data) => {
    try {
        return API.post("auth/signup", data);
    } catch (e) {
        console.log('Error in Sign Up service');
        console.log(e);
    }
}

export const login = (data) => {
    try {
        return API.post("auth/login", data);
    } catch (e) {
        console.log('Error in Login service');
        console.log(e);
    }
}
