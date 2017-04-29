import { isEmpty } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './upload-overlay.scss';

const reader = new FileReader();
const { showIf } = shared.helpers;

export class UploadOverlay extends React.PureComponent {
  static propTypes = {
    isFileOver: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onUpload: React.PropTypes.func.isRequired,
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
    this.props.onCancel();
  }

  handleDrop = (e) => {
    const files = e.dataTransfer.files;
    if (!isEmpty(files)) {
      getFileContents(files[0])
        .then(song => this.props.onUpload({ song }))
        .catch(this.props.onCancel);
    } else {
      this.props.onCancel();
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

function getFileContents(file) {
  return new Promise((resolve) => {
    reader.onload = (e) => {
      const data = e.target.result;
      reader.onload = undefined;
      resolve(JSON.parse(data));
    };
    reader.readAsText(file);
  });
}
