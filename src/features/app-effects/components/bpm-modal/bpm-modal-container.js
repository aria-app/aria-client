import { connect } from 'react-redux';
import { BPMModal } from './bpm-modal';
import song from '../../../song';
import appData from '../../../app-data';

export const BPMModalContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isOpen: appData.selectors.getIsBPMModalOpen(state),
}), {
  onConfirm: appData.actions.bpmModalClosed,
  onBPMChange: song.actions.bpmSet,
})(BPMModal);
