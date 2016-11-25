import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import shared from '../../../shared';
import './upload-overlay.scss';

const { showIf } = shared.helpers;

export class UploadOverlay extends React.Component {
  static propTypes = {
    isFileOver: React.PropTypes.bool.isRequired,
    onFileDragCancel: React.PropTypes.func.isRequired,
    onFileDrop: React.PropTypes.func.isRequired,
  }

  render() {
    return showIf(this.props.isFileOver)(
      h('.upload-overlay', {
        onDragLeave: this.handleDragLeave,
        onDragOver: this.handleDragOver,
        onDrop: this.handleDrop,
      }, [
        h('.upload-overlay__tint', [
          h('.upload-overlay__tint__drag-indicator', [
            'Drop project file to load it',
          ]),
        ]),
      ]),
    );
  }

  handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  handleDragLeave = () => {
    this.props.onFileDragCancel();
  }

  handleDrop = (e) => {
    const files = e.dataTransfer.files;
    if (!_.isEmpty(files)) {
      this.props.onFileDrop(files[0]);
    } else {
      this.props.onFileDragCancel();
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}
