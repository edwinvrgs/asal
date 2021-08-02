import React, {useCallback, useEffect, useState} from 'react';
import {
    Grid,
    List,
    Form,
    Button,
    Input,
    Label,
    Dropdown,
    Message,
    Dimmer,
    Loader,
} from 'semantic-ui-react'
import {ColumnFood} from "./styled";
import useFormInput from "../../hooks/useFormInput";
import {setSpinner, useUserDispatch, useUserState} from "../../contexts/user";
import {getIngredientFetch, getFoodsFetch, createFoodPost} from "../../services";


const AdminComidas = () => {

    const search = useFormInput('');
    const foodName = useFormInput('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [ingredients, setIngredients] = useState<any[]>([])
    const [ingSelected, setIngSelected] = useState<any[]>([])
    const [foods, setFoods] = useState<any[]>([])
    const { spinner } = useUserState();
    const dispatch = useUserDispatch();
    const filterBySearch = () => {
        return foods.filter((food) => {
            return search.value === '' || food.nombre.toLowerCase().includes(search.value.toLowerCase())
        })
    }

    const GetIngredients = useCallback(async () => {
        dispatch(setSpinner(spinner+1))
        const response = await getIngredientFetch();
        try {
            if (response?.status === 200){
                setIngredients(response.data.data.map(
                    (ingredient) => ({key: ingredient.id, text: ingredient.nombre, value: ingredient.id}))
                )
            }
        } finally {
            dispatch(setSpinner(spinner-1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const GetFoods = useCallback(async () => {
        dispatch(setSpinner(spinner+1))
        const response = await getFoodsFetch();
        try {
            if (response?.status === 200){
                setFoods(response.data.data)
            }
        } finally {
            dispatch(setSpinner(spinner-1))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = () => {
        if (ingSelected.length > 0) {
            createFood()
        } else {
            setErrorMessage(true)
        }
    }

    const createFood = async () => {
        setErrorMessage(false)
        dispatch(setSpinner(1))
        const data = {
            nombre: foodName.value,
            ingredientes: ingSelected,
        }
        const response = await createFoodPost(data);
        try {
            if (response?.status === 200){
                GetFoods()
                setIngSelected([])
                foodName.onChange({ target: { value: '' }})
            }
        } finally {
            dispatch(setSpinner(spinner-1))
        }
    }

    const addIngredient = (e, info) => {
        const newIng = {
            id: info.value,
            cantidad: null,
        }
        if (!ingSelected.some((ing) => ing.id === info.value)){
            setIngSelected([...ingSelected, newIng])
        }
    }

    const changeCantidad = (id, cantidad) => {
        const copyList = ingSelected;
        copyList.find((ing) => ing.id === id).cantidad = cantidad
        setIngSelected(copyList)
    }

    const removeIngSelected = (id) => {
        setIngSelected(ingSelected.filter((ing) => ing.id !== id))
    }

    useEffect(() => {
        GetIngredients();
        GetFoods();
    }, [GetFoods, GetIngredients]);

    return (
        <>
            {spinner > 0 && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <Grid centered>
                <Grid.Row columns={2}>
                    <ColumnFood style={{ borderRight: 'solid 1px #dedede' }}>
                        <Input icon='search' placeholder='Search...' style={{ width: '100%' }} {...search} />
                        <List divided relaxed>
                            {filterBySearch().map((food) => (
                                <List.Item>
                                    <List.Content>
                                        <List.Header>{food.nombre}</List.Header>
                                        comida
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>
                    </ColumnFood>
                    <ColumnFood>
                        <Form onSubmit={onSubmit}>
                            <Form.Field required>
                                <label>Nombre de la comida</label>
                                <Input placeholder='nombre' {...foodName} required />
                            </Form.Field>
                            <Form.Field required>
                                <label>Alimentos</label>
                                <Dropdown
                                    button
                                    className='icon'
                                    floating
                                    labeled
                                    icon='food'
                                    options={ingredients}
                                    search
                                    text='Selecciona tu alimento'
                                    onChange={addIngredient}
                                />
                                <Message
                                    header='Selecciona los alimentos que componen tu comida!'
                                    content='y a continuacion cuantos gr de cada alimento'
                                />
                                {errorMessage && (
                                    <Message
                                        negative
                                        header="Lo siento, intentalo de nuevo"
                                        content="Necesita seleccionar al menos un ingrediente con  respectiva cantidad en gramos"
                                    />
                                )}
                            </Form.Field>
                            {
                                ingSelected.length > 0 && (
                                    <List divided selection>
                                        {
                                            ingSelected.map((ing) => (
                                                <List.Item>
                                                    <Label horizontal>{ingredients.find((i) => i.value === ing.id).text}</Label>
                                                    <Input
                                                        placeholder='12'
                                                        size="small"
                                                        label={{ basic: true, content: 'gr' }}
                                                        labelPosition="right"
                                                        onChange={(e, info) => changeCantidad(ing.id, info.value)}
                                                        required
                                                    />
                                                    <Button
                                                        circular
                                                        color='red'
                                                        icon='trash'
                                                        floated="right"
                                                        onClick={() => removeIngSelected(ing.id)}
                                                    />
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                )
                            }
                            <br/>
                            <Button type='submit' positive floated="right">Crear comida</Button>
                        </Form>
                    </ColumnFood>
                </Grid.Row>
            </Grid>
        </>
    );
};

export default AdminComidas;
