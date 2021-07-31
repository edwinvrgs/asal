import React from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import {routes, RouteWithSubRoutes} from "./config";
import {UserProvider} from "./contexts/user";

const App = () => (
    <UserProvider>
        <BrowserRouter>
            <Switch>
                {routes.map((route) => (
                    <RouteWithSubRoutes key={route.path ?? 'not-found'} {...route} />
                ))}
            </Switch>
        </BrowserRouter>
    </UserProvider>
);

export default App;
