import * as actionTypes from '../actionTypes';
import { getNewsAction } from '../newsActions';

// Sample spec for action
describe('NewsAction', () => {
    it('should create a news action', () => {
        const payload = { 'name': 'Gaurav' }
        expect(getNewsAction(payload)).toEqual({
            type: actionTypes.FETCH_NEWS,
            payload
        })
    });
})