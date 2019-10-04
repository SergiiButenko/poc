import {createActions} from 'redux-actions';
import {pocApi} from '../provider';
import {arrayToObj} from '../helpers/common.helper';

const actions = createActions(
    {
        ENTITY:{
            VISITS: {
                UPDATE_IN: (path, value) => ( {path, value} ),
                UPDATE_BATCH: v => v,
                SET: v => v,
            }    
        },
        VISITS: {
            LOADING: v => v,
            FAILURE: v => v,
            UPDATING: v => v,
        }    
    }
);

export const {visits, entity} = actions;

const visitsKey = 'visits';

export const fetchVisits = () => {
    return async dispatch => {
        dispatch(visits.loading(true));

        try {
            let visits = await pocApi.getVisits();
            visits = arrayToObj(visits[visitsKey]);

            for (let key in visits) {
                visits[key].timestamp = new Date(
                    `${visits[key].timestamp.date} ${visits[key].timestamp.timezone}`,
                );
            }
            
            dispatch(entity.visits.updateBatch(visits));
        }
        catch (e) {
            dispatch(visits.failure(e));
        }
        dispatch(visits.loading(false));
    };
};


export const fetchVisitsById = (visitId) => {
    return async dispatch => {
        dispatch(visits.loading(true));

        try {

            const _visits = await pocApi.getVisitById(visitId);
            let visits = _visits[visitsKey][0];

            dispatch(entity.visits.UPDATE_IN(visits));
        }
        catch (e) {
            dispatch(visits.failure(e));
        }
        dispatch(visits.loading(false));
    };
};