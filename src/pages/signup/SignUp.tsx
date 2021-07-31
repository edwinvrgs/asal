import React from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";

import {AsalLogo} from "../../assets";
import useFormInput from "../../hooks/useFormInput";
import {useUserState} from "../../contexts/user";
import {Redirect} from "react-router-dom";

const SignUp = props => {
    const email = useFormInput('');
    const name = useFormInput('');
    const password = useFormInput('');

    const { logged } = useUserState();
    if (logged) {
        return <Redirect to="dashboard" />;
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={AsalLogo} /> Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input {...name} fluid icon='user' iconPosition='left' placeholder='Name' />
                        <Form.Input {...email} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            {...password}
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />
                        <Button color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default SignUp;
