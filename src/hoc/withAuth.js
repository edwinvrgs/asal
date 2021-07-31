import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserState } from '../context/user';

export const withAuth = (WrappedComponent) => {
    return (props) => {
        const state = useUserState();
        console.info(state);
        const { logged } = state;
        return logged ? <WrappedComponent {...state}/> : <Redirect to="/login"/>;
    };
}

export default withAuth;
