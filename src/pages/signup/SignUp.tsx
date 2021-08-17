import React from 'react';
import {Redirect, useHistory} from "react-router-dom";
import {Button, Dimmer, Form, Grid, Header, Image, Loader, Segment} from "semantic-ui-react";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import {format, isDate} from "date-fns";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

import {setSpinner, useUserDispatch, useUserState} from "../../contexts/user";
import {AsalLogo} from "../../assets";
import {signUp} from "../../services";
import {Input} from "../../components";

function parseDateString(value: Date) {
    if (!isDate(value)) {
        console.log("Not a valid date");
        console.log({ value })

        return null;
    }

    return format(value, "dd-MM-yyyy");
}

const userSchema = yup.object().shape({
    nombre: yup.string().max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
    sexo: yup.string().oneOf(["H", "M"]).required(),
    fecha_nacimiento: yup.date().required(),
    peso: yup.number().positive().integer().required().min(10),
    actividad_fisica: yup.number().oneOf([1, 2, 3, 4, 5, 6]).required(),
});

const SignUp = () => {
    const history = useHistory();
    const { user, spinner } = useUserState();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(userSchema)
    });
    const dispatch = useUserDispatch();

    const onSubmit = async data => {

        const parsedData = {
            ...data,
            fecha_nacimiento: parseDateString(data.fecha_nacimiento)
        };

        try {
            dispatch(setSpinner(1));
            const response = await signUp(parsedData);
            toast.success(response?.data?.message);

            history.push('login');
        } catch (e) {
            console.dir(e);
            toast.error(e.response?.data?.message);
        } finally {
            dispatch(setSpinner(0));
        }
    }

    if (user) {
        return <Redirect to="dashboard" />;
    }

    return (
        <>
            {spinner === 1 && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={AsalLogo} /> Sign up into ASAL
                    </Header>
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
                            <Input name="email" icon="mail" placeholder="Ingrese su correo" control={control} />
                            <Input name="password" icon="lock" type="password" placeholder="Ingrese su contraseña" control={control}/>
                            <Button type="submit" color='teal' fluid size='large'>Sign Up</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default SignUp;
