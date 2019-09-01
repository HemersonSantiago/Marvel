import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Commic from './pages/commic';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/commic/:id" component={Commic} />
        </Switch>
    </BrowserRouter>
);

export default Routes;