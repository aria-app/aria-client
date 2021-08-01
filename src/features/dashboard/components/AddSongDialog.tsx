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
import { useHistory } from 'react-router-dom';

import { Song } from '../../../types';
import { useCreateSong } from '../../api';

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
  onIsOpenChange: (isOpen: boolean) => void;
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
  const history = useHistory();
  const { t } = useTranslation();

  const close = useCallback(() => {
    onIsOpenChange(false);
  }, [onIsOpenChange]);

  const handleSubmitCallback = useCallback<
    SubmitHandler<AddSongDialogFormValues>
  >(
    async ({ name }) => {
      try {
        const { data } = await createSong({
          variables: {
            input: {
              name: name.replace(/\s+/g, ' ').trim(),
            },
          },
        });

        if (!data) {
          throw new Error('Could not create song');
        }

        history.push(`/edit-song/${data.createSong.song.id}`);
      } catch (error) {
        setError('name', error);
      }
    },
    [createSong, history, setError],
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
          <Text variant="header">{t('New Song')}</Text>
          <TextField
            error={errors.name?.message}
            inputProps={{
              autoFocus: true,
              ...register('name', {
                required: 'You must enter a name.',
              }),
            }}
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
            <Button onClick={close} text="Cancel" />
            <Button
              color="brandPrimary"
              isLoading={isSubmitting}
              text={t('Create')}
              type="submit"
              variant="contained"
            />
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
};
