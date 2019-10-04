import {createSelector} from 'reselect';

const getVisitsState = (state) => state.visits;
const gitAllVisits = (state) => { return state.entity.visits ? state.entity.visits.toJS() : null };

export const getVisits = createSelector(
    [gitAllVisits, getVisitsState],
    (visits, visitsState) => {        
        return {
            ...visitsState,
            visits,
        };
    }
);