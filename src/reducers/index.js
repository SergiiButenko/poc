import {combineReducers} from 'redux';

import entity from './entity';
import sensors from './sensors';
import visits from './visits';
import statistics from './statistics';

const createFilteredReducer = (reducerFunction, reducerPredicate) =>
    (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    };

const filter = (key) => action => action.type.startsWith(key);

export default combineReducers({
    entity:          createFilteredReducer(entity,         filter('ENTITY')),
    sensors:         createFilteredReducer(sensors,        filter('SENSORS')),
    visits:          createFilteredReducer(visits,         filter('VISITS')),
    statistics:      createFilteredReducer(statistics,     filter('STATISTICS')),
});