import React from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {routes, RouteWithSubRoutes} from "./config";
import {UserProvider} from "./contexts/user";

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
    <UserProvider>
        <ToastContainer />
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
