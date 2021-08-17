import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Card, Dimmer, Divider, Form, Grid, Header, Icon, Label, Loader, Segment} from "semantic-ui-react";
import {Controller, useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {setSpinner, updateUser, useUserDispatch, useUserState} from "../../contexts/user";
import {getUserInfoFetch, signUp} from "../../services";
import {Input} from "../../components";
import {StyledImage} from "./styled";

const Perfil = () => {
    const history = useHistory();
    const { user, spinner } = useUserState();
    const dispatch = useUserDispatch();

    const userSchema = yup.object().shape({
        nombre: yup.string().max(20).required(),
        email: yup.string().email().required(),
        sexo: yup.string().oneOf(["H", "M"]).required(),
        edad: yup.number().positive().integer().required().min(18),
        peso: yup.number().positive().integer().required().min(10),
        actividad_fisica: yup.number().oneOf([1, 2, 3, 4, 5, 6]).required(),
    });

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async data => {
        try {
            dispatch(setSpinner(1))
            await signUp(data);
            alert('Usuario creado con exito');

            history.push('login')
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setSpinner(1))
        }
    }

    useEffect(() => {
        dispatch(setSpinner(1))
        async function fetchMyAPI() {
            const response = await getUserInfoFetch();
            try {
                if (response?.status === 200){
                    dispatch(updateUser(response.data))
                    const userData = response.data;
                    reset({
                        nombre: userData.name,
                        email: userData.email,
                        sexo: userData.sexo,
                        edad: userData.edad,
                        peso: userData.peso,
                        actividad_fisica: Number(userData.actividad_fisica),
                    });
                }
            } finally {
                dispatch(setSpinner(0))
            }
        }
        fetchMyAPI();
    }, [dispatch, reset])

    return (
        <>
            {spinner === 1 && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <Segment>
                <Grid columns={2} relaxed='very' centered>
                    <Grid.Column>
                        <Card centered>
                            {user?.id && (
                              <StyledImage
                                src={
                                    user?.sexo === 'M'
                                      ? 'https://react.semantic-ui.com/images/avatar/large/molly.png'
                                      : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                }
                                wrapped
                                ui={false}
                              />
                            )}
                            <Card.Content>
                                <Card.Header>{user?.name}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>{user?.edad} años de edad</span>
                                </Card.Meta>
                                <Card.Description>
                                    {user?.email}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='male' />
                                {user?.peso} Kg
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='heartbeat' />
                                {user?.actividad_fisica}/6 Actividad fisica
                            </Card.Content>
                            <Card.Content extra>
                                <Header as='h4' icon='calendar alternate outline' content="Consumo Diario Ideal" />
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='info' />
                                    {user?.calorias}
                                    <Label.Detail>calorias</Label.Detail>
                                </Label>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='info' />
                                    {user?.carbohidratos}
                                    <Label.Detail>carbohidratos</Label.Detail>
                                </Label>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='info' />
                                    {user?.grasas}
                                    <Label.Detail>grasas</Label.Detail>
                                </Label>
                            </Card.Content>
                            <Card.Content extra>
                                <Label>
                                    <Icon name='info' />
                                    {user?.proteinas}
                                    <Label.Detail>proteinas</Label.Detail>
                                </Label>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                            <Segment stacked>
                                <Input name="nombre" icon="user" placeholder="Ingrese su nombre" control={control} />
                                <Controller
                                  control={control}
                                  name="sexo"
                                  render={({field, fieldState: { error }}) =>
                                    <Form.Select
                                      {...field}
                                      onChange={(_, { value }) => field.onChange(value)}
                                      error={error?.message}
                                      placeholder="Seleccione su sexo"
                                      options={[
                                          { key: 'H', value: 'H', text: 'Hombre' },
                                          { key: 'M', value: 'M', text: 'Mujer' },
                                      ]}
                                    />
                                  }
                                />
                                <Input name="edad" icon="user" type="number" placeholder="Ingrese su edad" control={control} />
                                <Input name="peso" icon="user" type="number" placeholder="Ingrese su peso" control={control} />
                                <Controller
                                  control={control}
                                  name="actividad_fisica"
                                  render={({field, fieldState: { error }}) =>
                                    <>
                                        <Form.Field>
                                            <label htmlFor="actividad_fisica">Del 1 al 6, cuanta actividad fisica realiza mensualmente</label>
                                        </Form.Field>
                                        <Form.Field error={error?.message}>
                                            <Grid columns={2} divided>
                                                <Grid.Column>
                                                    {Array.from({ length: 3 }).map((_, index) =>
                                                      <Form.Radio
                                                        {...field}
                                                        key={index + 4}
                                                        onChange={() => field.onChange(index + 1)}
                                                        label={index + 1}
                                                        checked={field.value === index + 1}
                                                      />
                                                    )}
                                                </Grid.Column>
                                                <Grid.Column>
                                                    {Array.from({ length: 3 }).map((_, index) =>
                                                      <Form.Radio
                                                        {...field}
                                                        key={index + 4}
                                                        onChange={() => field.onChange(index + 4)}
                                                        label={index + 4}
                                                        checked={field.value === index + 4}
                                                      />
                                                    )}
                                                </Grid.Column>
                                            </Grid>
                                        </Form.Field>
                                    </>
                                  }
                                />
                                <Input name="email" icon="mail" placeholder="Ingrese su correo" control={control} />
                                <Button type="submit" color='teal' fluid size='large'>Actualizar</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Divider vertical>---</Divider>
            </Segment>

        </>
    );
};

export default Perfil;
