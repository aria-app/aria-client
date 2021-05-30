import AddIcon from '@material-ui/icons/Add';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, BoxProps, Button } from '../../shared';

export type AddTrackButtonProps = BoxProps;

export default function AddTrackButton(
  props: AddTrackButtonProps,
): ReactElement {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        transition: 'transform 200ms ease',
      }}
      {...props}
    >
      <Button color="text.hint" startIcon={<AddIcon />} sx={{ minWidth: 0 }}>
        {t('Add Track')}
      </Button>
    </Box>
  );
}
