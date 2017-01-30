import { connect } from 'react-redux';
import { BPMModal } from './bpm-modal';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

// wallaby-ignore
export const BPMModalContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isOpen: selectors.getIsBPMModalOpen(state),
}), {
  onConfirm: actions.bpmModalClosed,
  onBPMChange: song.actions.bpmSet,
})(BPMModal);
