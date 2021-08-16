import {API} from "../config/api";

export const getIngredients = async () => {
    try {
        return await API.get("ingredientes");
    } catch (e) {
        console.log('Error getting ingredients');
        return e;
    }
}

export const getRecipes = async () => {
    try {
        return await API.get("recetas");
    } catch (e) {
        console.log('Error getting recipes');
        return e;
    }
}

export const createRecipes = (data) => {
    try {
        return API.post("recetas", data);
    } catch (e) {
        console.log('Error creating recipes');
        console.log(e);
    }
}

export const getFoods = async () => {
    try {
        return await API.get("user/comida");
    } catch (e) {
        console.log('Error getting foods');
        return e;
    }
}

export const createFood = (data) => {
    try {
        return API.post("user/comida", data);
    } catch (e) {
        console.log('Error creating foods');
        console.log(e);
    }
}
