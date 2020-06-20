import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as Endpoints from '../../constants/EndPointConstants';
import { newsSuccessAction, newsErrorAction, newsUpdatedAction } from '../actions/newsActions';
import { updateSessionAction } from '../actions/sessionActions';
import { getSessionData } from '../../utils/SessionService';

const getNewsFromAPI = (pageId) => {
    return axios.get(Endpoints.FETCH_NEWS, { params: { page: pageId } });
}

export function* fetchNewsSaga(action) {
    try {
        const { data } = yield getNewsFromAPI(action.payload.pageId);
        const sessionData = (typeof window !== 'undefined') ? getSessionData() : [];
        const updatedData = data.hits.map(item => {
            const targetItem = sessionData.find(v => (v.objectID === item.objectID));
            return { ...item, ...targetItem };
        });
        yield put(newsSuccessAction(updatedData));
    } catch (error) {
        yield put(newsErrorAction(error));
    }
}

export function* upvoteNewsSaga(action) {
    const { newsList, newsItem } = { ...action.payload };

    newsItem.points += 1;
    const updatedNewsList = newsList.map(item => {
        if (item.objectID === newsItem.objectID) {
            return {
                ...item,
                ...newsItem
            }
        } 
            return item;
        
    });

    yield put(updateSessionAction(newsItem));
    yield put(newsUpdatedAction(updatedNewsList));
}

export function* hideNewsSaga(action) {
    const { newsList, newsItem } = { ...action.payload };

    newsItem.isHidden = true;
    const updatedNewsList = newsList.map(item => {
        if (item.objectID === newsItem.objectID) {
            return {
                ...item,
                ...newsItem
            }
        } 
            return item;
        
    });

    yield put(updateSessionAction(newsItem));
    yield put(newsUpdatedAction(updatedNewsList));
}
