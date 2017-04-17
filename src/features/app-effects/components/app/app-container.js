import { connect } from 'react-redux';
import { App } from '../app/app';
import song from '../../../song';
import appData from '../../../app-data';

// wallaby-ignore
export const AppContainer = connect(state => ({
  isSequenceOpen: !!song.selectors.getActiveSequenceId(state),
}), {
  onFileDragStart: appData.actions.fileDragStarted,
})(App);
