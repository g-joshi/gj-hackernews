import React from 'react';
import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from 'redux-saga';
import fs from 'fs';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import newsReducer from '../src/store/reducers/newsReducer';
import { fetchNewsSaga } from '../src/store/sagas/newsSaga';
import Routes from '../src/routes/routes.config';

const sheet = new ServerStyleSheet();
const compression = require('compression');

const app = express();
const sagaMiddleware = createSageMiddleware();
const store = createStore(newsReducer, applyMiddleware(sagaMiddleware));

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../', 'build')));

app.get('/:pageId', (req, res) => {
  sagaMiddleware
    .run(function* anon() {
      yield fetchNewsSaga({ payload: { pageId: req.params.pageId } });
    })
    .toPromise()
    .then(() => {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.path} context={{}}>
            <StyleSheetManager sheet={sheet.instance}>
              {renderRoutes(Routes)}
            </StyleSheetManager>
          </StaticRouter>
        </Provider>
      );

      const styleTags = sheet.getStyleTags();

      fs.readFile(path.resolve('build/index.html'), 'utf-8', (error, data) => {
        if (error) {
          res.send('something went wrong');
        }
        let data2 = '';
        data2 = data.replace(
          '<div id="root"></div>',
          `${styleTags}<div id="root">${content}</div><script type="text/javascript" charset="utf-8">window.__INITIAL_STATE__ = ${JSON.stringify(
            store.getState()
          )};</script>`
        );
        res.send(data2);
      });
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log('Application is up');
});
