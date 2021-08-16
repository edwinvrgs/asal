import React, {useEffect, useState} from "react";
import {getRecipes} from "../../../services";
import {Label, Form, List, Message, Tab, Button, Dropdown} from "semantic-ui-react";
import {ColumnFood} from "../../recetas/styled";

type Receta = {
    nombre: string;
    id: number;
}

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

    const mappedRecipes = recipes?.map(recipe => ({
        key: recipe.id,
        text: recipe.nombre,
        value: recipe.id
    }));

    function addRecipe(event, data) {
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

    function onSubmit() {

    }

    function renderSelector() {
        return <ColumnFood>
            <Form onSubmit={onSubmit}>
                <Form.Field required>
                    <label>Recetas</label>
                    <Dropdown
                        button
                        className='icon'
                        floating
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
                                    <List.Item>
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
    }

    return (
        <Tab.Pane loading={recipes === null}>
            {recipes && recipes.length > 0 ? (
                renderSelector()
            ) : (
                <div>No hay recetas para mostrar</div>
            )}
        </Tab.Pane>
    );
};

export default ConsumirTab;
