import * as actionTypes from './actionTypes';

export const getNewsAction = payload => {
    return {
        type: actionTypes.FETCH_NEWS,
        payload
    }
};

export const newsSuccessAction = payload => {
    return {
        type: actionTypes.FETCH_NEWS_SUCCESS,
        payload
    }
};
export const newsErrorAction = payload => {
    return {
        type: actionTypes.FETCH_NEWS_ERROR,
        payload
    }
};

export const newsUpdatedAction = payload => {
    return {
        type: actionTypes.NEWS_ITEM_UPDATED,
        payload
    }
};

export const hideNewsAction = payload => {
    return {
        type: actionTypes.HIDE_NEWS,
        payload
    }
}

export const upvoteNewsAction = payload => {
    return {
        type: actionTypes.UPVOTE_NEWS,
        payload
    }
}

export default {
    getNewsAction
}