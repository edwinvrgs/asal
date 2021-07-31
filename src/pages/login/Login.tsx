import React, {useState} from 'react'
import {Button, Dimmer, Form, Grid, Header, Image, Loader, Message, Segment} from 'semantic-ui-react';
import {AsalLogo} from "../../assets";
import {Redirect, useHistory} from "react-router-dom";
import {setSpinner, updateUser, useUserDispatch, useUserState} from "../../contexts/user";
import useFormInput from "../../hooks/useFormInput";
import {api} from "../../config/api";

const Login = () => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [errorMessage, setErrorMessage] = useState(false);

    const { logged, spinner } = useUserState();

    const history = useHistory();
    const dispatch = useUserDispatch();

    const submit = () => {
        dispatch(setSpinner(true))
        setErrorMessage(false)
        api.post("auth/login", {
            email: email.value,
            password: password.value,
        })
            .then((response) => {
                console.info(response);
                if (response.status === 200){
                    dispatch(updateUser(true, response.data))
                    history.push("admin-comidas")
                }
                dispatch(setSpinner(true))
            })
            .catch((error) => {
                console.log('ERROR IN LOGIN', error);
                if (error.response.status === 422) {
                    setErrorMessage(true)
                    console.info("CREDENCIALES INVALIDAS", error.response)
                }
                dispatch(setSpinner(false))
                throw error;
            });
    }

    if (logged) {
        return <Redirect to="dashboard" />
    }
    return (
        <>
            {spinner && (
                <Dimmer active>
                    <Loader />
                </Dimmer>
            )}
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={AsalLogo} /> Log-in to your account
                    </Header>
                    <Form size='large' error={errorMessage}>
                        <Segment stacked>
                            <Form.Input {...email} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                {...password}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large' onClick={submit}>
                                Login
                            </Button>
                        </Segment>
                        {errorMessage && (
                            <Message
                                error
                                header='Credenciales invalidas'
                                content='Por favor verifique que el email y contraseña sean correctos'
                            />
                        )}
                    </Form>
                    <Message>
                        New to us? <a href='/signup'>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Login;
