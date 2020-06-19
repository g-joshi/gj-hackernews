import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_NEWS_SUCCESS): {
            return {
                ...state,
                hits: action.payload
            }
        }

        case (actionTypes.NEWS_ITEM_UPDATED): {
            return {
                ...state,
                hits: [...action.payload]
            }
        }
        default: {
            return {...state}; // Just so hydrate does not trigger a re-render
        }
    }
}

export default newsReducer;
