import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogicMiddleware } from 'redux-logic';
import location from '../features/location';
import shared from '../features/shared';
import persistMiddleware from './persistMiddleware';
import logic from './logic';
import reducer from './reducer';

const logicMiddleware = createLogicMiddleware(logic);

const middlewareEnhancer = applyMiddleware(
  location.router.middleware,
  logicMiddleware,
  persistMiddleware,
);

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: [
    shared.actions.POSITION_REQUEST_SUCCEEDED,
  ],
});

const store = createStore(reducer, composeEnhancers(
  location.router.enhancer,
  middlewareEnhancer,
));

export default store;
