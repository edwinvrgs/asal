import {api} from "../config/api";

export const signUp = async ({ data }) => {
    try {
        return api.post("auth/signup", data);
    } catch (e) {
        console.log('Error in Sign Up service');
        console.error(e);
    }
}

export const login = () => {
// Login service
}
