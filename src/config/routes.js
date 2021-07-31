import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { SignUp, Login, Dashboard } from '../pages';
import { Layout } from '../components'
import {useUserState} from "../contexts/user";

export const withAuth = (WrappedComponent) => {
    return () => {
        const state = useUserState();
        const { logged } = state;
        return logged ? <WrappedComponent {...state}/> : <Redirect to="/login"/>;
    };
}

const NotFound = () => <div>Pagina no encontrada</div>

export const routes = [
    {
        path: "/signup",
        component: SignUp,
        exact: true
    },
    {
        path: "/login",
        component: Login,
        exact: true,
    },
    {
        path: "/(.)*",
        component: withAuth(Layout),
        routes: [
            {
                path: '/dashboard',
                component: Dashboard,
            },
            {
                path: '/admin-comidas',
                component: Dashboard,
            },
        ],
    },
    {
        component: NotFound,
    },
];

export const RouteWithSubRoutes = (route) => (
    <Route
        exact={route.exact ?? false}
        path={route.path}
        render={(props) => (
            <>
                <route.component{...props}/>
                {route.routes?.map(subRoute => (
                    <Route path={subRoute.path} exact={subRoute.exact} render={(props) => (
                        <route.component {...props} {...subRoute} />
                    )}/>
                ))}
            </>
        )}
    />
)
