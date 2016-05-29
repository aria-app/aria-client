import playing from 'ducks/playing';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import transport from 'ducks/transport';

export function initialize() {
  return (dispatch) => {
    dispatch(song.actions.loadSong()).then(() => {
      dispatch(transport.effects.updateSequences());
      dispatch(shortcuts.actions.initialize());
      dispatch(playing.effects.initialize());
    });
  };
}
