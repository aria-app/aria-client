import { connect } from 'react-redux';
import { UploadOverlay } from './upload-overlay';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const UploadOverlayContainer = connect(state => ({
  isFileOver: selectors.getIsFileOver(state),
}), {
  onFileDragCancel: actions.fileDragCancelled,
  onFileDrop: actions.fileDropped,
})(UploadOverlay);
