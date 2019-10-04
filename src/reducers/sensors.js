import {handleActions} from 'redux-actions';

const defaultState = {
    loading: true,
    updating: false,
    sensorsFetchError: null,
};

export default handleActions({
    SENSORS: {
        FAILURE: (state, action) => {
            return {
                ...state,
                sensorsFetchError: action.payload,
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