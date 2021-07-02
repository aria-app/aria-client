import { Box, BoxProps, Button } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export type AddTrackButtonProps = BoxProps<'div'>;

export const AddTrackButton: FC<AddTrackButtonProps> = (props) => {
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
};
