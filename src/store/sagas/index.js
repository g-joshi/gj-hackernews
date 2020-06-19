import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';
import { fetchNewsSaga, hideNewsSaga, upvoteNewsSaga } from './newsSaga';
import { updateSessionSaga } from './sessionSaga';

export function* watchFetchNewsSaga() {
    yield takeEvery(actionTypes.FETCH_NEWS, fetchNewsSaga);
    yield takeEvery(actionTypes.HIDE_NEWS, hideNewsSaga);
    yield takeEvery(actionTypes.UPVOTE_NEWS, upvoteNewsSaga);
    yield takeEvery(actionTypes.UPDATE_SESSION, updateSessionSaga);
}
