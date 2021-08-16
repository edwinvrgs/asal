import React, {useEffect} from 'react';
import {Button, Card, Dimmer, Divider, Form, Grid, Header, Icon, Label, Loader, Segment} from "semantic-ui-react";
import {Controller, useForm} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {setSpinner, updateUser, useUserDispatch, useUserState} from "../../contexts/user";
import {getUserInfoFetch, updateUserInfoPut} from "../../services";
import {Input} from "../../components";
import {StyledCard, StyledImage} from "./styled";
import {differenceInYears, format, isDate, subYears} from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";


function parseDateString(value: Date) {
    if (!isDate(value)) {
        console.log("Not a valid date");
        console.log({ value })

        return null;
    }

    return format(value, "dd-MM-yyyy");
}


const Perfil = () => {
    const { user, spinner } = useUserState();
    const dispatch = useUserDispatch();

    const userSchema = yup.object().shape({
        nombre: yup.string().max(20).required(),
        sexo: yup.string().oneOf(["H", "M"]).required(),
        fecha_nacimiento: yup.date().required(),
        peso: yup.number().positive().integer().required().min(10),
        actividad_fisica: yup.number().oneOf([1, 2, 3, 4, 5, 6]).required(),
    });

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(userSchema)
    });

    async function fetchMyAPI() {
        dispatch(setSpinner(1))
        const response = await getUserInfoFetch();
        try {
            if (response?.status === 200){
                dispatch(updateUser(response.data))
                const userData = response.data;
                reset({
                    nombre: userData.name,
                    sexo: userData.sexo,
                    fecha_nacimiento: new Date(userData.fecha_nacimiento),
                    peso: userData.peso,
                    actividad_fisica: Number(userData.actividad_fisica),
                });
            }
        } finally {
            dispatch(setSpinner(0))
        }
    }

    const onSubmit = async data => {
        try {
            dispatch(setSpinner(1))
            const parsedData = {
                ...data,
                fecha_nacimiento: parseDateString(data.fecha_nacimiento)
            };
            const response = await updateUserInfoPut(parsedData);
            try {
                if (response?.status === 200){
                    dispatch(updateUser(response.data))
                    fetchMyAPI();
                    toast.success('Usuario actualizado con exito');
                }
            } finally {
                if ([422, 401, 400].includes(response?.response?.status)) {
                    toast.error('Hubo un problema actualizando la informacion del usuario');
                }
                dispatch(setSpinner(0))
            }
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setSpinner(0))
        }
    }

    useEffect(() => {
        fetchMyAPI();
    }, [])

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
                        <StyledCard centered>
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
                                    <span className='date'>
                                        {`${differenceInYears(new Date(), new Date(user?.fecha_nacimiento))} años de edad`}
                                    </span>
                                </Card.Meta>
                                <Card.Description>
                                    {user?.email}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Icon name='male' />
                                {user?.peso} Kg
                            </Card.Content>
                            <Card.Content>
                                <Icon name='heartbeat' />
                                {user?.actividad_fisica}/6 Actividad fisica
                            </Card.Content>
                            <Card.Content>
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
                        </StyledCard>
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
                                <Controller
                                  control={control}
                                  name="fecha_nacimiento"
                                  render={({field, fieldState: { error }}) => (
                                    <>
                                        <Form.Field>
                                            <label htmlFor="fecha_nacimiento">Ingrese su fecha de nacimiento</label>
                                        </Form.Field>
                                        <Form.Field error={error?.message}>
                                            <DatePicker
                                              selected={field.value}
                                              onChange={(date) => field.onChange(date)}
                                            />
                                        </Form.Field>
                                    </>
                                  )}
                                />
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
