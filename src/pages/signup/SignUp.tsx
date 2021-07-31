import React from 'react';
import {Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { Controller, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {AsalLogo} from "../../assets";

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

const Input = React.forwardRef(({ control, name, type, icon, placeholder }: InputProps, ref) => (
    <>
        <Controller
            control={control}
            name={name}
            render={({field: { onChange, onBlur, value, name }, fieldState: { error }}) => (
                 <>
                     <Form.Input
                         error={!!error}
                         name={name}
                         onChange={onChange}
                         onBlur={onBlur}
                         value={value}
                         type={type}
                         iconPosition='left'
                         fluid
                         icon={icon}
                         placeholder={placeholder}
                     />
                     <p>{error?.message}</p>
                 </>
            )}
        />
    </>
))

const SignUp = () => {
    const { control, handleSubmit  } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => console.log(data);

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={AsalLogo} /> Sign up into ASAL
                </Header>
                <Form size='large' onSubmit={handleSubmit(onSubmit)}>
                    <Segment stacked>
                        <Input name="name" icon="user" placeholder="Ingrese su nombre" control={control} />
                        <Input name="email" icon="mail" placeholder="Ingrese su correo" control={control}  />
                        <Input name="password" icon="lock" placeholder="Password" control={control}/>
                        <Button color='teal' fluid size='large'>Sign Up</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default SignUp;
