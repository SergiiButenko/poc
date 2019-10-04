import {createActions} from 'redux-actions';
import {pocApi} from '../provider';
import {arrayToObj, statisticsToObj} from '../helpers/common.helper';

const actions = createActions(
    {
        ENTITY:{
            SENSORS: {
                UPDATE_IN: (path, value) => ( {path, value} ),
                UPDATE_BATCH: v => v,
                SET: v => v,
            },

        },
        SENSORS: {
            LOADING: v => v,
            FAILURE: v => v,
            UPDATING: v => v,
        }    
    }
);

export const {sensors, entity} = actions;

const sensorsKey = 'touchPoints';

export const fetchSensors = () => {
    return async dispatch => {
        dispatch(sensors.loading(true));

        try {
            let sensors = await pocApi.getSensors();
            sensors = arrayToObj(sensors[sensorsKey]);

            dispatch(entity.sensors.updateBatch(sensors));
        }
        catch (e) {
            dispatch(sensors.failure(e));
        }
        dispatch(sensors.loading(false));
    };
};

export const fetchSensorById = (sensorId) => {
    return async dispatch => {
        dispatch(sensors.loading(true));

        try {

            const _sensors = await pocApi.getSensors(sensorId);
            let sensor = _sensors[sensorsKey][0];

            dispatch(entity.sensors.UPDATE_IN(sensor));
        }
        catch (e) {
            dispatch(sensors.failure(e));
        }
        dispatch(sensors.loading(false));
    };
};