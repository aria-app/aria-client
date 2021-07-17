import { Box, Button } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

export interface AddTrackButtonProps {
  onClick?: HTMLAttributes<HTMLButtonElement>['onClick'];
}

export const AddTrackButton: FC<AddTrackButtonProps> = (props) => {
  const { onClick } = props;
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        cursor: 'pointer',
        display: 'flex',
        transition: 'transform 200ms ease',
      }}
    >
      <Button
        color="backgroundContrast"
        onClick={onClick}
        startIcon={<AddIcon />}
        text={t('Add Track')}
        variant="contained"
      />
    </Box>
  );
};
