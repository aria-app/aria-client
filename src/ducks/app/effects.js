import playing from 'ducks/playing';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import transport from 'ducks/transport';

export function initialize() {
  return (dispatch) => {
    dispatch(song.actions.loadSong()).then(() => {
      dispatch(playing.effects.initialize());
      dispatch(shortcuts.actions.initialize());
      dispatch(transport.effects.initialize());
    });
  };
}
