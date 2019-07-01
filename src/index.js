import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas';


const sagaMiddleware = createSagaMiddleware();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;
const enhancer = reduxDevTools
    ? compose(applyMiddleware(sagaMiddleware), reduxDevTools())
    : applyMiddleware(sagaMiddleware);
const store = createStore(reducer,enhancer);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>
    ,
    document.getElementById('root')
); 