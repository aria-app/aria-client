import { connect } from 'react-redux';
import { BPMModal } from './bpm-modal';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const BPMModalContainer = connect(state => ({
  BPM: song.selectors.getBPM(state),
  isOpen: selectors.getIsBPMModalOpen(state),
}), {
  onConfirm: actions.bpmModalClosed,
  onBPMSet: song.actions.bpmSet,
})(BPMModal);
