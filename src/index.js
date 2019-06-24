import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import './index.css';

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import middlewareA from './middlewares/middlewareA';
import middlewareB from './middlewares/middlewareB';

const store = createStore(reducer,
  compose(
  applyMiddleware(middlewareA, middlewareB),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>
  ,
  document.getElementById('root')
); 