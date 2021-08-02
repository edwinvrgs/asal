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

export const getIngredientFetch = async () => {
    try {
        const response = await API.get("ingredientes");

        return response;
    } catch (e) {
        console.log('Error getting ingredient');
        return e;
    }
}

export const getFoodsFetch = async () => {
    try {
        const response = await API.get("recetas");

        return response;
    } catch (e) {
        console.log('Error getting foods');
        return e;
    }
}

export const createFoodPost = (data) => {
    try {
        return API.post("recetas", data);
    } catch (e) {
        console.log('Error creating receta');
        console.log(e);
    }
}
