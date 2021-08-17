import React, {useEffect, useState} from "react";
import {createFood, getRecipes} from "../../../services";
import {Label, Form, List, Message, Tab, Button, Dropdown} from "semantic-ui-react";
import {ColumnFood} from "../../recetas/styled";
import {toast} from "react-toastify";
import {setSpinner, useUserDispatch, useUserState} from "../../../contexts/user";

type Receta = {
    nombre: string;
    id: number;
}

const FoodTypes = ['desayuno', 'almuerzo', 'cena', 'merienda'].map((foodType, i) => ({
    text: foodType,
    key: i,
    value: i
}));

function useRecetas() {
    const [data, setData] = useState<null | Receta[]>(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getRecipes();
                setData(response.data.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [])

    return data;
}

const ConsumirTab = () => {
    const recipes = useRecetas();
    const [selectedRecipes, setSelectedRecipes] = useState<Receta[]>([]);
    const [foodType, setFoodType] = useState(FoodTypes[0]);

    const { spinner } = useUserState();
    const dispatch = useUserDispatch();

    const mappedRecipes = recipes?.map(recipe => ({
        key: recipe.id,
        text: recipe.nombre,
        value: recipe.id
    }));

    function addRecipe(_, data) {
        const value = recipes?.find(recipe => recipe.id === data.value);

        if (!value) {
            return null;
        }

        const uniqueValues = new Set([...selectedRecipes, value]);
        setSelectedRecipes(Array.from(uniqueValues))
    }

    function removeRecipe(id) {
        const filteredValues = selectedRecipes.filter((recipe) => recipe.id !== id);

        setSelectedRecipes(filteredValues);
    }

    function selectFoodType(_, data) {
        const value = FoodTypes.find(el => el.value === data.value);

        if (!value) {
            return null;
        }

        setFoodType(value);
    }

    async function onSubmit() {
        const data = {
            tipo: foodType.text,
            recetas: selectedRecipes.map(recipes => recipes.id),
        };

        try {
            dispatch(setSpinner(1));
            const response = await createFood(data);
            toast.success(response?.data?.message);
        } catch (e) {
            console.dir(e);

            const messages = e.response?.data?.message;

            if(!Array.isArray(messages)) {
                return;
            }

            Object.keys(messages).map(key =>
                toast.error(messages[key][0])
            );
        } finally {
            dispatch(setSpinner(0));
        }
    }

    return (
        <Tab.Pane loading={recipes === null || spinner > 0}>
            {recipes && recipes.length > 0 ? (
                <ColumnFood>
                    <Form onSubmit={onSubmit}>
                        <Form.Field required>
                            <label>Tipo de comida</label>
                            <Dropdown
                                value={foodType.key}
                                button
                                className='icon'
                                labeled
                                options={FoodTypes}
                                onChange={selectFoodType}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Recetas</label>
                            <Dropdown
                                button
                                className='icon'
                                labeled
                                icon='food'
                                options={mappedRecipes}
                                search
                                text='Selecciona tu Receta'
                                onChange={addRecipe}
                            />
                            <Message header='Selecciona las recetas que deseas consumir'/>
                        </Form.Field>
                        {
                            selectedRecipes.length > 0 && (
                                <List divided selection>
                                    {
                                        selectedRecipes.map((recipe) => (
                                            <List.Item key={recipe.id}>
                                                <Label horizontal>{recipe.nombre}</Label>
                                                <Button
                                                    circular
                                                    color='red'
                                                    icon='trash'
                                                    floated="right"
                                                    onClick={() => removeRecipe(recipe.id)}
                                                />
                                            </List.Item>
                                        ))
                                    }
                                </List>
                            )
                        }
                        <br/>
                        <Button type='submit' positive floated="right">CONSUMIR</Button>
                    </Form>
                </ColumnFood>
            ) : (
                <div>No hay recetas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ConsumirTab;
