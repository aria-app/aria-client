import AddIcon from '@material-ui/icons/Add';
import { Box, BoxProps, Button } from 'aria-ui';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export type AddTrackButtonProps = BoxProps<'div'>;

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
      <Button
        color="backgroundContrast"
        startIcon={<AddIcon />}
        text={t('Add Track')}
        variant="contained"
      />
    </Box>
  );
}
