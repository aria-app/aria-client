import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistMiddleware from './persist-middleware';
import loggerMiddleware from './logger-middleware';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  loggerMiddleware,
  persistMiddleware,
  sagaMiddleware,
);

const store = createStore(reducer, middleware);

sagaMiddleware.run(saga);

export default store;
