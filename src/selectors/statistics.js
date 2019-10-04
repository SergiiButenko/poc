import {createSelector} from 'reselect';

const getStatisticsState = (state) => state.statistics;
const gitAllStatistics = (state) => { return state.entity.statistics ? state.entity.statistics.toJS() : null };

export const getStatistics = createSelector(
    [gitAllStatistics, getStatisticsState],
    (statistics, statisticsState) => {        
        return {
            ...statisticsState,
            statistics,
        };
    }
);