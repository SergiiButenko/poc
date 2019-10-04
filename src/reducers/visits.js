import {handleActions} from 'redux-actions';

const defaultState = {
    loading: true,
    updating: false,
    visitsFetchError: null,
};

export default handleActions({
    VISITS: {
        FAILURE: (state, action) => {
            return {
                ...state,
                visitsFetchError: action.payload,
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