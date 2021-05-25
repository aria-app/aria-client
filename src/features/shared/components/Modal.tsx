import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import isNil from 'lodash/fp/isNil';
import { memo } from 'react';

import { Box } from './Box';

export interface ModalProps extends DialogProps {
  titleText?: string;
}

function Modal(props: ModalProps) {
  const { children, titleText, ...rest } = props;

  return (
    <Dialog fullWidth={true} maxWidth="xs" {...rest}>
      {!isNil(titleText) && <DialogTitle>{titleText}</DialogTitle>}
      <Box component={DialogContent} sx={{ paddingBottom: 6 }}>
        {children}
      </Box>
    </Dialog>
  );
}

export default memo(Modal);
