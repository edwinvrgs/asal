import React from 'react';
import { Switch } from 'react-router-dom';
import { withAuth } from './hoc/withAuth';
import { BasicRoute, routes } from './config/routes';

const AuthApp = () => (
    <Switch>
        {routes.map(
            (route) => {
                return <BasicRoute key={route.path} {...route} />;
            },
        )}
    </Switch>
);

export default withAuth(AuthApp);
