import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSageMiddleware from "redux-saga";
import Routes from './routes/routes.config';
import { watchFetchNewsSaga } from './store/sagas';
import newsReducer from './store/reducers/newsReducer';
import * as serviceWorker from './serviceWorker';
import { initialize, getSessionData } from './utils/SessionService';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSageMiddleware();

// intialize persistent state
if (!getSessionData()) {
  initialize();
}

if (window.__INITIAL_STATE__) {
  // Sync initial state with session data
  const sessionData = (typeof window !== 'undefined') ? getSessionData() : [];
  const updatedData = window.__INITIAL_STATE__.hits.map(item => {
    const targetItem = sessionData.find(v => (v.objectID === item.objectID));
    return { ...item, ...targetItem };
  });

  window.__INITIAL_STATE__.hits = updatedData;
} else {
  window.__INITIAL_STATE__ = {};
}

const store = createStore(
  newsReducer,
  window.__INITIAL_STATE__,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(watchFetchNewsSaga);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        {renderRoutes(Routes)}
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
