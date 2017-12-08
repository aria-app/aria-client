import Mousetrap from 'mousetrap';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import * as actions from '../actions';

const shortcuts = [
  {
    combos: ['space'],
    keydown: actions.PAN_HELD,
    keyup: actions.PAN_RELEASED,
  },
];

export const initialize = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process(deps, dispatch) {
    shortcuts.forEach((shortcut) => {
      Mousetrap.bind(shortcut.combos, (e) => {
        e.preventDefault();

        if (e.repeat) return;

        dispatch({
          type: shortcut.keydown,
          e,
        });
      });
      Mousetrap.bind(shortcut.combos, (e) => {
        e.preventDefault();

        if (e.repeat) return;

        dispatch({
          type: shortcut.keyup,
          e,
        });
      }, 'keyup');
    });
  },
});
