import {handleActions} from 'redux-actions';
import {baseEntityReducers} from './base';
import {Map} from 'immutable';


export const defaultState = Map();

export default handleActions({
    ENTITY: {
        SENSORS: {
            ...baseEntityReducers
        }
    }
}, defaultState);