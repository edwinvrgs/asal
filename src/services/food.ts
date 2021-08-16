import {API} from "../config/api";

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
export const getUserInfoFetch = async () => {
    try {
        const response = await API.get("auth/user");

        return response;
    } catch (e) {
        console.log('Error getting the user information');
        return e;
    }
}
