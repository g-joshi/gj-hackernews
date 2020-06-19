import React from "react";
import express from "express";
import path from "path";
import Routes from '../src/routes/routes.config';
import { renderToString } from "react-dom/server";
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSageMiddleware from "redux-saga";
import newsReducer from '../src/store/reducers/newsReducer';
import { fetchNewsSaga } from '../src/store/sagas/newsSaga';
import fs from 'fs';

const app = express();
const sagaMiddleware = createSageMiddleware();
const store = createStore(newsReducer, applyMiddleware(sagaMiddleware));

app.use('/static', express.static(path.resolve(__dirname, '../', 'build/static')));

app.get('/:pageId', (req, res) => {
    sagaMiddleware.run(function* () {
        yield fetchNewsSaga({ payload: { pageId: req.params.pageId } })
    }).toPromise().then(_ => {
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    {renderRoutes(Routes)}
                </StaticRouter>
            </Provider>
        );

        fs.readFile(path.resolve('build/index.html'), 'utf-8', (error, data) => {
            if (error) { res.send('something went wrong'); }

            data = data.replace(
                '<div id="root"></div>',
                `<div id="root">${content}</div><script type="text/javascript" charset="utf-8">window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};</script>`
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