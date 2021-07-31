import React from 'react'
import {Button, Dimmer, Form, Grid, Header, Image, Loader, Message, Segment} from 'semantic-ui-react';
import {AsalLogo} from "../../assets";
import {Redirect} from "react-router-dom";
import {setSpinner, useUserDispatch, useUserState} from "../../contexts/user";
import useFormInput from "../../hooks/useFormInput";
import {api} from "../../config/api";

const Login = () => {
    const email = useFormInput('');
    const password = useFormInput('');
    const { logged, spinner } = useUserState();
    const dispatch = useUserDispatch();
    const submit = () => {
        dispatch(setSpinner(true))
        api.post("login", {
            email: email.value,
            password: password.value,
        })
            .then((response) => {
                console.info(response);
                dispatch(setSpinner(true))
            })
            .catch((error) => {
                console.log('ERROR IN LOGIN', error);
                dispatch(setSpinner(false))
                throw error;
            });
    }

    if (logged) {
        return <Redirect to="dashboard" />
    }
    return !spinner ? (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={AsalLogo} /> Log-in to your account
                </Header>
                <Form size='large'>
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
                </Form>
                <Message>
                    New to us? <a href='/signup'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    ) : (
        <Dimmer active>
            <Loader />
        </Dimmer>
    )
}

export default Login;
