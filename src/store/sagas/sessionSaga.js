import {updateSession} from '../../utils/SessionService';

export function* updateSessionSaga(action) {
    const newsItem = action.payload;
    updateSession(newsItem);

    yield newsItem;
}