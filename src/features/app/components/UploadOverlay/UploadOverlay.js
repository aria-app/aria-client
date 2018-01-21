import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { showIf } from 'react-render-helpers';
import './UploadOverlay.scss';

const reader = new FileReader();

export class UploadOverlay extends React.PureComponent {
  static propTypes = {
    isFileOver: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
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
        .then(this.props.onUpload)
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
