import {createActions} from 'redux-actions';
import {pocApi} from '../provider';
import {arrayToObj, statisticsToObj} from '../helpers/common.helper';

const actions = createActions(
    {
        ENTITY:{
            STATISTICS: {
                UPDATE_IN: (path, value) => ( {path, value} ),
                UPDATE_BATCH: v => v,
                SET: v => v,
            }    
        },
        STATISTICS: {
            LOADING: v => v,
            FAILURE: v => v,
            UPDATING: v => v,
        }    
    }
);

export const {statistics, entity} = actions;

const statisticsKey = 'statistics';

export const fetchStatistics = () => {
    return async dispatch => {
        dispatch(statistics.loading(true));

        try {
            let statistics = await pocApi.getStatistics();
            statistics = statisticsToObj(statistics[statisticsKey]);
            console.log(statistics)
            dispatch(entity.statistics.updateBatch(statistics));
        }
        catch (e) {
            dispatch(statistics.failure(e));
        }
        dispatch(statistics.loading(false));
    };
};