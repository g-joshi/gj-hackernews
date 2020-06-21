import { put } from 'redux-saga/effects';
import { upvoteNewsSaga } from '../newsSaga';
import { updateSessionAction } from '../../actions/sessionActions';
import { newsUpdatedAction } from '../../actions/newsActions';
import * as actionTypes from '../../actions/actionTypes';

describe('News Sagas', () => {
    describe('upvoteNewsSaga', () => {
        const action = {
            payload: {
                newsList: [{ objectID: 1, points: 10 }, { objectID: 2, points: 11 }],
                newsItem: { objectID: 1, points: 10 }
            },
            type: actionTypes.UPVOTE_NEWS
        };

        const expectedNewsItem = { objectID: 1, points: 11 };
        const expectedNewsList = [{ objectID: 1, points: 11 }, { objectID: 2, points: 11 }];
        const genFunc = upvoteNewsSaga(action);
        it('upvoteNewsSaga to dispatch updateSessionAction and newsUpdatedAction', () => {
            expect(genFunc.next().value).toEqual(put(updateSessionAction(expectedNewsItem)));
            expect(genFunc.next().value).toEqual(put(newsUpdatedAction(expectedNewsList)));
        });
    })
});