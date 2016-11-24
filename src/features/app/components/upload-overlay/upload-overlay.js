import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './upload-overlay.scss';

const component = props => (props.isFileOver ? h('.upload-overlay', {
  onDragLeave: props.onDragLeave,
  onDragOver: props.browserNoOp,
  onDrop: props.onDrop,
}, [
  h('.upload-overlay__tint', [
    h('.upload-overlay__drag-indicator', [
      'Drop project file to load it',
    ]),
  ]),
]) : null);

const composed = compose(
  setDisplayName('UploadOverlay'),
  setPropTypes({
    cancelFileDrag: React.PropTypes.func.isRequired,
    dropFile: React.PropTypes.func.isRequired,
  }),
  pure,
  withHandlers({
    browserNoOp: () => (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    onDragLeave: props => () => {
      props.cancelFileDrag();
    },
    onDrop: props => (e) => {
      const files = e.dataTransfer.files;
      if (!_.isEmpty(files)) {
        props.dropFile(files[0]);
      } else {
        props.cancelFileDrag();
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
  }),
)(component);

export const UploadOverlay = composed;
