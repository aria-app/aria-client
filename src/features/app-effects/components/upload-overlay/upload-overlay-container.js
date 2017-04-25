import { connect } from 'react-redux';
import appData from '../../../app-data';
import * as selectors from '../../selectors';
import { UploadOverlay } from './upload-overlay';

export const UploadOverlayContainer = connect(state => ({
  isFileOver: selectors.getIsFileOver(state),
}), {
  onFileDragCancel: appData.actions.fileDragCancelled,
  onFileDrop: appData.actions.fileDropped,
})(UploadOverlay);
