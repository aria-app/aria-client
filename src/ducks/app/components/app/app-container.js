import { connect } from 'react-redux';
import { App } from '../app/app';
import song from 'ducks/song';
import * as actions from '../../actions';

export const AppContainer = connect(state => ({
  isSequenceOpen: !!song.selectors.getActiveSequenceId(state),
}), {
  initialize: actions.initialized,
})(App);
