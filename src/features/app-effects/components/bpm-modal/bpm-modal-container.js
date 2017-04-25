import { connect } from 'react-redux';
import song from '../../../song';
import appData from '../../../app-data';
import * as selectors from '../../selectors';
import { BPMModal } from './bpm-modal';

export const BPMModalContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isOpen: selectors.getIsBPMModalOpen(state),
}), {
  onConfirm: appData.actions.bpmModalClosed,
  onBPMChange: appData.actions.bpmSet,
})(BPMModal);
