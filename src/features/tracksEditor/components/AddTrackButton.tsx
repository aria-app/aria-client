import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Translation } from 'react-i18next';

import shared from '../../shared';

const { Box, Button } = shared.components;

export default function AddTrackButton(props: any) {
  return (
    <Translation>
      {(t) => (
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            transition: 'transform 200ms ease',
          }}
          {...props}
        >
          <Button
            color="text.hint"
            startIcon={<AddIcon />}
            sx={{ minWidth: 0 }}
          >
            {t('Add Track')}
          </Button>
        </Box>
      )}
    </Translation>
  );
}
