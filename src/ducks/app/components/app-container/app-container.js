import { connect } from 'react-redux';
import { App } from '../app/app';
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
    loadSong: (...args) => dispatch(song.actions.loadSong(...args)),
  };
}
