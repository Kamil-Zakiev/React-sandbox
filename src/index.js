import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import createSagaMiddleware from 'redux-saga';
import cellClickingSaga from './store/cellClickingSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ));
    
sagaMiddleware.run(cellClickingSaga);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>
    ,
    document.getElementById('root')
); 