import {createSelector} from 'reselect';

const getSensorsState = (state) => state.sensors;
const gitAllSensors = (state) => { return state.entity.sensors ? state.entity.sensors.toJS() : null };

export const getSensors = createSelector(
    [gitAllSensors, getSensorsState],
    (sensors, sensorsState) => {        
        return {
            ...sensorsState,
            sensors,
        };
    }
);