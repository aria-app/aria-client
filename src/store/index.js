import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from './logger-middleware';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  loggerMiddleware,
  sagaMiddleware,
);

const store = createStore(reducer, middleware);

sagaMiddleware.run(saga);

export default store;
