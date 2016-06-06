import shortcuts from 'ducks/shortcuts';
import transport from 'ducks/transport';

export function initialize() {
  return (dispatch) => {
    dispatch(shortcuts.actions.initialize());
    dispatch(transport.effects.initialize());
  };
}
