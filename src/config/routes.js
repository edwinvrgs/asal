import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { SignUp, Login, Dashboard } from '../pages';
import { Layout } from '../components'
import {useUserState} from "../contexts/user";
import AdminComidas from "../pages/adminComidas/AdminComidas";

export const withAuth = (WrappedComponent) => {
    return () => {
        const state = useUserState();
        const { user } = state;
        return user ? <WrappedComponent {...state}/> : <Redirect to="/login"/>;
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
                path: ['/dashboard', '/'],
                component: Dashboard,
                exact: true
            },
            {
                path: '/comidas',
                component: AdminComidas,
                exact: true
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
                    <Route key={subRoute.path} path={subRoute.path} exact={subRoute.exact} render={(props) => (
                        <subRoute.component {...props} {...subRoute} />
                    )}/>
                ))}
            </>
        )}
    />
)
