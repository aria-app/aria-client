import { connect } from 'react-redux';
import { App } from '../app/app';
import playing from 'ducks/playing';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    initializeShortcuts: (...args) => dispatch(shortcuts.actions.initialize(...args)),
    initializeSynths: (...args) => dispatch(playing.effects.initialize(...args)),
    loadSong: (...args) => dispatch(song.actions.loadSong(...args)),
  };
}
