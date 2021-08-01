import React, {useState} from 'react'
import {Button, Dimmer, Form, Grid, Header, Image, Loader, Message, Segment} from 'semantic-ui-react';
import {AsalLogo} from "../../assets";
import {Redirect, useHistory, Link} from "react-router-dom";
import {setSpinner, updateUser, useUserDispatch, useUserState} from "../../contexts/user";
import useFormInput from "../../hooks/useFormInput";
import {login} from "../../services";

const Login = () => {
    const email = useFormInput('');
    const password = useFormInput('');
    const [errorMessage, setErrorMessage] = useState(false);

    const { user, spinner } = useUserState();

    const history = useHistory();
    const dispatch = useUserDispatch();

    const onSubmit = async () => {
        dispatch(setSpinner(1))
        setErrorMessage(false)
        const response = await login({
            email: email.value,
            password: password.value,
        });
        try {
            if (response?.status === 200){
                dispatch(updateUser(response.data))
                history.push('dashboard')
            }
        } finally {
            if (response?.response?.status === 422 || response?.response?.status === 401) {
                setErrorMessage(true)
                console.info("Credenciales invalidas", response?.response)
            }
            dispatch(setSpinner(0))
        }
    }

    if (user) {
        return <Redirect to="dashboard" />
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

                            <Button color='teal' fluid size='large' onClick={onSubmit}>
                                Login
                            </Button>
                        </Segment>
                        {errorMessage && (
                            <Message
                                negative
                                header='Credenciales invalidas'
                                content='Por favor verifique que el email y contraseña sean correctos'
                            />
                        )}
                    </Form>
                    <Message>
                        New to us? <Link
                        to="/signup"
                    >
                        Sign Up
                    </Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Login;
