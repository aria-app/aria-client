import {
  Button,
  Dialog,
  Select,
  SelectOption,
  Stack,
  Text,
  TextField,
} from 'aria-ui';
import { range } from 'lodash';
import { FC, MouseEventHandler, useCallback } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Song } from '../../../types';

const bpmOptions: SelectOption[] = range(60, 161, 10).map((n) => ({
  label: n,
  value: n,
}));

export type AddSongDialogConfirmHandler = (
  songOptions: Pick<Song, 'bpm' | 'name'>,
) => void;

interface AddSongDialogFormValues {
  bpm: string;
  name: string;
}

export interface AddSongDialogProps {
  isOpen?: boolean;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: AddSongDialogConfirmHandler;
}

export const AddSongDialog: FC<AddSongDialogProps> = (props) => {
  const { isOpen, onCancel, onConfirm } = props;
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddSongDialogFormValues>({
    defaultValues: {
      bpm: '100',
      name: 'New Song',
    },
  });
  const { t } = useTranslation();

  const onSubmit = useCallback<SubmitHandler<AddSongDialogFormValues>>(
    (data) => {
      onConfirm({
        ...data,
        bpm: parseInt(data.bpm, 10),
      });
    },
    [onConfirm],
  );

  return (
    <Dialog isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space={8}>
          <Text variant="header">{t('Add Song')}</Text>
          <TextField
            error={errors.name && t('You must enter a name')}
            inputProps={register('name', { required: true })}
            label="Name"
          />
          <Controller
            control={control}
            name="bpm"
            render={({ field }) => (
              <Select
                label="BPM"
                options={bpmOptions}
                selectProps={{ ...field }}
              />
            )}
          />
          <Stack
            direction="row"
            space={2}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button onClick={onCancel} text="Cancel" />
            <Button
              color="brandPrimary"
              text="Add Song"
              type="submit"
              variant="contained"
            />
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
};
