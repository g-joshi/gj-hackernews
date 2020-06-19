import * as SessionConstants from '../constants/SessionConstants';

export const initialize = () => {
    localStorage.setItem(SessionConstants.PERSISTENT_STATE, JSON.stringify([]));
}

export const getSessionData = () => {
    return JSON.parse(localStorage.getItem(SessionConstants.PERSISTENT_STATE));
};

export const updateSession = ({ objectID, isHidden = false, points }) => {
    const persistentState = getSessionData();

    const index = persistentState.findIndex(v => v.objectID === objectID);

    if(index >= 0) {
        persistentState[index].isHidden = isHidden;
        persistentState[index].points = points;
    } else {
        persistentState.push({
            objectID,
            isHidden,
            points
        });    
    }
    
    localStorage.setItem(SessionConstants.PERSISTENT_STATE, JSON.stringify(persistentState));
}
