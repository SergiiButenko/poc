import {handleActions} from 'redux-actions';

const defaultState = {
    loading: true,
    updating: false,
    statisticsFetchError: null,
};

export default handleActions({
    STATISTICS: {
        FAILURE: (state, action) => {
            return {
                ...state,
                statisticsFetchError: action.payload,
            };
        },
        LOADING: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        UPDATING: (state, action) => {
            return {
                ...state,
                updating: action.payload,
            };
        },
    }
}, defaultState);