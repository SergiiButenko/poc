import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import 'typeface-roboto';

import SensorsPage from './components/pages/SensorsPage';
import VisitsPage from './components/pages/VisitsPage';
import MapPage from './components/pages/MapPage';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <CssBaseline/>
                <Route exact path="/" component={MapPage}/>
                <Route exact path="/sensors" component={SensorsPage}/>
                <Route exact path="/visits" component={VisitsPage}/>
            </div>
        </BrowserRouter>
    );
};

export default hot(module)(App);
