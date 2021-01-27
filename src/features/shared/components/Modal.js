import Box from '@material-ui/core/Box';
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
      <Box component={DialogContent} sx={{ paddingBottom: 6 }}>
        {children}
      </Box>
    </Dialog>
  );
}

export default Modal;
