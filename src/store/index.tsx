import { configureStore } from 'redux-starter-kit';
import { createLogicMiddleware } from 'redux-logic';
import shared from '../features/shared';
import logic from './logic';
import reducer from './reducer';

const logicMiddleware = createLogicMiddleware(logic);

export default configureStore({
  devTools: {
    actionsBlacklist: [shared.actions.POSITION_REQUEST_SUCCEEDED],
  },
  middleware: [logicMiddleware],
  reducer,
});
