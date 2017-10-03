import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import audioClientData from '../features/audio-client-data';
import persistMiddleware from './persist-middleware';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(
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
