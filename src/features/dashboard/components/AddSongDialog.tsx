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
import { FC, useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Song } from '../../../types';
import { useCreateSong } from '../../api/hooks/useCreateSong';

const bpmOptions: SelectOption[] = range(60, 161, 10).map((n) => ({
  label: n,
  value: n,
}));

export type AddSongDialogConfirmHandler = (
  songOptions: Pick<Song, 'bpm' | 'name'>,
) => void;

interface AddSongDialogFormValues {
  bpm: number;
  name: string;
}

export interface AddSongDialogProps {
  isOpen?: boolean;
  onIsOpenChange: () => void;
}

export const AddSongDialog: FC<AddSongDialogProps> = (props) => {
  const { isOpen, onIsOpenChange } = props;
  const [createSong] = useCreateSong();
  const { formState, handleSubmit, register, reset, setError } =
    useForm<AddSongDialogFormValues>({
      defaultValues: {
        bpm: 100,
      },
    });
  const { errors, isSubmitting } = formState;
  const { t } = useTranslation();

  const handleSubmitCallback = useCallback<
    SubmitHandler<AddSongDialogFormValues>
  >(
    async ({ name }) => {
      try {
        await createSong({
          name,
        });
        onIsOpenChange();
      } catch (e) {
        setError('name', {
          message: e.message,
          type: 'server',
        });
      }
    },
    [createSong, onIsOpenChange, setError],
  );

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog isOpen={isOpen}>
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <Stack space={8}>
          <Text variant="header">{t('Add Song')}</Text>
          <TextField
            error={errors.name?.message}
            inputProps={register('name', {
              required: 'You must enter a name.',
            })}
            label="Name"
            placeholder="Enter a name for your song"
          />
          <Select
            label="BPM"
            options={bpmOptions}
            selectProps={register('bpm', { valueAsNumber: true })}
          />
          <Stack
            direction="row"
            space={2}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button onClick={onIsOpenChange} text="Cancel" />
            <Button
              color="brandPrimary"
              isLoading={isSubmitting}
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
