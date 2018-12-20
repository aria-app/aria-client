import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { showIf } from 'react-render-helpers';

const reader = new FileReader();

const StyledUploadOverlay = styled.div`
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 550;
`;

const UploadOverlayTint = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: inherit;
`;

const UploadOverlayDragIndicator = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.margin.m}px;
  pointer-events: none;
  z-index: inherit;
`;

export class UploadOverlay extends React.PureComponent {
  static propTypes = {
    isFileOver: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
  }

  render() {
    return showIf(this.props.isFileOver)(
      <StyledUploadOverlay
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}>
        <UploadOverlayTint>
          <UploadOverlayDragIndicator
            className="upload-overlay__tint__drag-indicator">
            Drop project file to load it
          </UploadOverlayDragIndicator>
        </UploadOverlayTint>
      </StyledUploadOverlay>
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
