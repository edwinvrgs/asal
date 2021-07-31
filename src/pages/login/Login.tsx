import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {AsalLogo} from "../../assets";
import {Redirect} from "react-router-dom";
import {useUserState} from "../../context/user";

const Login = () => {
    const { logged } = useUserState();
    if (logged) {
        return <Redirect to="dashboard" />
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={AsalLogo} /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='/registro'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login;
