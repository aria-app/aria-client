import { connect } from 'react-redux';
import { BPMModal } from '../bpm-modal/bpm-modal';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const BPMModalContainer = connect((state) => ({
  BPM: song.selectors.getBPM(state),
  isOpen: selectors.getIsBPMModalOpen(state),
}), {
  close: actions.closeBPMModal,
  set: song.actions.setBPM,
})(BPMModal);
