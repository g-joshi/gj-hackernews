import * as actionTypes from './actionTypes';

export const updateSessionAction = (payload) => {
    return {
        type: actionTypes.UPDATE_SESSION,
        payload
    }
};
