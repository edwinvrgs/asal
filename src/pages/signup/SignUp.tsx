import React from 'react';
import {Redirect} from "react-router-dom";
import {Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { Controller, useForm } from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useUserState} from "../../contexts/user";
import {AsalLogo} from "../../assets";
import {signUp} from "../../services";

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    password: yup.string().required(),
});

type InputProps = {
    control: any,
    name: string,
    type?: string,
    icon?: string,
    placeholder?: string,
}

const Input = ({ control, name, type, icon, placeholder }: InputProps) => (
    <Controller
        control={control}
        name={name}
        render={({field, fieldState: { error }}) => (
             <>
                 <Form.Input
                     type={type}
                     iconPosition='left'
                     fluid
                     icon={icon}
                     placeholder={placeholder}
                     error={!!error}
                     {...field}
                 />
                 <p>{error?.message}</p>
             </>
        )}
    />
)

const SignUp = () => {
    const { logged } = useUserState();
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        console.log({ data })

        return;
        const response = signUp(data);
        console.log(response);
    }

    if (logged) {
        return <Redirect to="dashboard" />;
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={AsalLogo} /> Sign up into ASAL
                </Header>
                <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                    <Segment stacked>
                        <Input name="name" icon="user" placeholder="Ingrese su nombre" control={control} />
                        <Input name="age" icon="user" type="number" placeholder="Ingrese su edad" control={control} />
                        <Input name="email" icon="mail" placeholder="Ingrese su correo" control={control} />
                        <Input name="password" icon="lock" type="password" placeholder="Ingrese su contraseña" control={control}/>
                        <Button type="submit" color='teal' fluid size='large'>Sign Up</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default SignUp;
