import playing from 'ducks/playing';
import shortcuts from 'ducks/shortcuts';
import transport from 'ducks/transport';

export function initialize() {
  return (dispatch) => {
    dispatch(playing.effects.initialize());
    dispatch(shortcuts.actions.initialize());
    dispatch(transport.effects.initialize());
  };
}
