import { Route } from 'react-router-dom';
import {dashboard} from "../pages/dashboard";

export const BasicRoute = (route) => (
    <Route
        exact={route.exact ?? false}
        path={route.path}
        render={(props) => (
            <route.component
                {...props}
            />
        )}
    />
);

const notFound = () => <div>Pagina no encontrada</div>


export const routes = [
    {
        path: '/dashboard',
        component: dashboard,
    },
    {
        component: notFound,
    },
];
