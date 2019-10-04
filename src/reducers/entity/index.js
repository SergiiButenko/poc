import {combineReducers} from 'redux';

import sensors from './sensors';
import visits from './visits';
import statistics from './statistics';

export default combineReducers({
    sensors,
    visits,
    statistics
});





