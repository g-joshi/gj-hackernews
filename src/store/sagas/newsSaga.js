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
        let sessionData = (typeof window !== 'undefined') ? getSessionData() : [];
        let updatedData = data.hits.map(item => {
            let targetItem = sessionData.find(v => (v.objectID === item.objectID));
            return { ...item, ...targetItem };
        });
        yield put(newsSuccessAction(updatedData));
    } catch (error) {
        yield put(newsErrorAction(error));
    }
}

export function* upvoteNewsSaga(action) {
    const { newsList, newsItem } = { ...action.payload };

    newsItem.points = newsItem.points + 1;
    let updatedNewsList = newsList.map(item => {
        if (item.objectID === newsItem.objectID) {
            return {
                ...item,
                ...newsItem
            }
        } else {
            return item;
        }
    });

    yield put(updateSessionAction(newsItem));
    yield put(newsUpdatedAction(updatedNewsList));
}

export function* hideNewsSaga(action) {
    const { newsList, newsItem } = { ...action.payload };

    newsItem.isHidden = true;
    let updatedNewsList = newsList.map(item => {
        if (item.objectID === newsItem.objectID) {
            return {
                ...item,
                ...newsItem
            }
        } else {
            return item;
        }
    });

    yield put(updateSessionAction(newsItem));
    yield put(newsUpdatedAction(updatedNewsList));
}
