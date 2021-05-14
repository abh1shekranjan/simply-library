import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Authentication from './components/authentication/authentication';

export const routesPath = {
    DEFAULT: '/',
    HOME: '/home'
}
export default function Routers() {
    return (
        <Router>
            <Switch>
                <Route path={routesPath.DEFAULT} component={Authentication} />
            </Switch>
        </Router>
    )
}