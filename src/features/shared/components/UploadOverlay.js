import classnames from 'classnames';
import isEmpty from 'lodash/fp/isEmpty';
import withStyles from '@material-ui/styles/withStyles';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import showIf from 'react-render-helpers/showIf';

const reader = new FileReader();

const styles = theme => ({
  root: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 550,
  },
  tint: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.text.primary),
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 'inherit',
  },
  dragIndicator: {
    alignItems: 'center',
    backgroundColor: transparentize(0.5, theme.palette.text.primary),
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    pointerEvents: 'none',
    zIndex: 'inherit',
  },
});

class UploadOverlay extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classnames: PropTypes.object,
    isFileOver: PropTypes.bool,
    onCancel: PropTypes.func,
    onUpload: PropTypes.func,
  };

  render() {
    return showIf(this.props.isFileOver)(
      <div
        className={classnames(this.props.classes.root, this.props.className)}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className={this.props.classes.tint}>
          <div className={this.props.classes.dragIndicator}>
            Drop project file to load it
          </div>
        </div>
      </div>,
    );
  }

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  handleDragLeave = () => {
    this.props.onCancel();
  };

  handleDrop = e => {
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
  };
}

export default withStyles(styles)(UploadOverlay);

function getFileContents(file) {
  return new Promise(resolve => {
    reader.onload = e => {
      const data = e.target.result;
      reader.onload = undefined;
      resolve(JSON.parse(data));
    };
    reader.readAsText(file);
  });
}
