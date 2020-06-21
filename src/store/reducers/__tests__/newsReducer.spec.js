import newsReducer from '../newsReducer';
import * as actionTypes from '../../actions/actionTypes';

describe('newsReducer', () => {
    it('should return default state for default case', () => {

        const initalState = {
            name: 'some default state'
        };
        expect(newsReducer(initalState, {
            'type': 'Not a defined action type'
        })).toEqual(initalState);
    })

    it(`should return updated state for ${actionTypes.FETCH_NEWS_SUCCESS}`, () => {
        const payload = {
            'name': 'some payload'
        };
        const fetchNewsAction = {
            type: actionTypes.FETCH_NEWS_SUCCESS,
            payload
        }
        const initalState = {};
        const expectedState = {
            hits: payload
        };

        expect(newsReducer(initalState, fetchNewsAction)).toEqual(expectedState);
    });
});