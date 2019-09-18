import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'typeface-roboto';

import GroupsPage from './components/GroupsPage';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <CssBaseline/>
                <Route exact path="/" component={GroupsPage}/>
            </div>
        </BrowserRouter>
    );
};

export default hot(module)(App);
