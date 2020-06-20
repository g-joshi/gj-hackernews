import React from "react";
import express from "express";
import path from "path";
import Routes from '../src/routes/routes.config';
import { renderToNodeStream } from "react-dom/server";
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from "redux-saga";
import newsReducer from '../src/store/reducers/newsReducer';
import { fetchNewsSaga } from '../src/store/sagas/newsSaga';
import fs from 'fs';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const sheet = new ServerStyleSheet();
var compression = require('compression')
const app = express();
const sagaMiddleware = createSageMiddleware();
const store = createStore(newsReducer, applyMiddleware(sagaMiddleware));

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../', 'build')));

app.get('/:pageId', (req, res) => {
    sagaMiddleware.run(function* () {
        yield fetchNewsSaga({ payload: { pageId: req.params.pageId } })
    }).toPromise().then(_ => {
        const content = renderToNodeStream(
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
            if (error) { res.send('something went wrong'); }

            data = data.replace(
                '<div id="root"></div>',
                `${styleTags}<div id="root">${content}</div><script type="text/javascript" charset="utf-8">window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};</script>`
            );
            res.send(data);
        });
    }, (error) => {
        console.log(error);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Application is up');
});