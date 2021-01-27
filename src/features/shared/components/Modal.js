import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';

Modal.propTypes = {
  isOpen: PropTypes.bool,
  titleText: PropTypes.string,
};

function Modal(props) {
  const { children, isOpen, titleText, ...rest } = props;

  return (
    <Dialog fullWidth={true} maxWidth="xs" open={isOpen} {...rest}>
      {!isNil(titleText) && <DialogTitle>{titleText}</DialogTitle>}
      <DialogContent sx={{ paddingBottom: 24 }}>{children}</DialogContent>
    </Dialog>
  );
}

export default Modal;
