import {API} from "../config/api";

export const getIngredientFetch = async () => {
    try {
        return await API.get("ingredientes");
    } catch (e) {
        console.log('Error getting ingredient');
        return e;
    }
}
export const getFoodsFetch = async () => {
    try {
        return await API.get("recetas");
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
