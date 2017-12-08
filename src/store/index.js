import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';
import createSagaMiddleware from 'redux-saga';
import audioClientData from '../features/audio-client-data';
import persistMiddleware from './persist-middleware';
import logic from './logic';
import reducer from './reducer';
import saga from './saga';

const logicMiddleware = createLogicMiddleware(logic);

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(
  logicMiddleware,
  sagaMiddleware,
  persistMiddleware,
);

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: [
    audioClientData.actions.POSITION_REQUEST_SUCCEEDED,
  ],
});

const store = createStore(reducer, composeEnhancers(
  middlewareEnhancer,
));

sagaMiddleware.run(saga);

export default store;
