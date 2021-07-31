import React from "react";
import { Route, Redirect } from 'react-router-dom';
import { SignUp, Login, Dashboard } from '../pages';
import { Layout } from '../components'
import {useUserState} from "../contexts/user";

export const withAuth = (WrappedComponent) => {
    return () => {
        const state = useUserState();
        console.info(state);
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
        component: Layout,
        routes: [
            {
                path: '/dashboard',
                component: withAuth(Dashboard),
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
                        <route.component {...props} {...subRoute} />
                    )}/>
                ))}
            </>
        )}
    />
)
