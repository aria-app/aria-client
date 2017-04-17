import { connect } from 'react-redux';
import { UploadOverlay } from './upload-overlay';
import appData from '../../../app-data';

export const UploadOverlayContainer = connect(state => ({
  isFileOver: appData.selectors.getIsFileOver(state),
}), {
  onFileDragCancel: appData.actions.fileDragCancelled,
  onFileDrop: appData.actions.fileDropped,
})(UploadOverlay);
