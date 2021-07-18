import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { Box, Button, Fade, Stack, Toolbar } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { FC, useCallback, useEffect, useState } from 'react';

import { DELETE_SONG, GET_SONGS } from '../../api';
import { useAuth } from '../../auth';
import { LoadingIndicator } from '../../shared';
import { AddSongDialog } from './AddSongDialog';
import { SongList } from './SongList';

export const Dashboard: FC<RouteComponentProps> = (props) => {
  const { navigate } = props;
  const { logout, user } = useAuth();
  const [deleteSong, { loading: deleteLoading }] = useMutation(DELETE_SONG);
  const { data, loading: getLoading } = useQuery(GET_SONGS, {
    notifyOnNetworkStatusChange: true,
    skip: !user,
    variables: {
      sort: 'updatedAt',
      sortDirection: 'desc',
      userId: user && user.id,
    },
  });
  const [isAddSongDialogOpen, setIsAddSongDialogOpen] =
    useState<boolean>(false);

  const loading = deleteLoading || getLoading;

  const handleAddSongClick = useCallback(async () => {
    setIsAddSongDialogOpen(true);
  }, [setIsAddSongDialogOpen]);

  const handleAddSongDialogIsOpenChange = useCallback(() => {
    setIsAddSongDialogOpen(false);
  }, [setIsAddSongDialogOpen]);

  const handleSongDelete = useCallback(
    async (song) => {
      const shouldDelete = window.confirm(
        `Are you sure you want to delete the song "${song.name}"?`,
      );

      if (!shouldDelete) return;

      try {
        await deleteSong({
          variables: {
            id: song.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [deleteSong],
  );

  const handleSongOpen = useCallback(
    (song) => {
      navigate?.(`edit-song/${song.id}`);
    },
    [navigate],
  );

  const handleUserClick = useCallback(() => {
    const shouldSignOut = window.confirm('Do you want to sign out?');

    if (!shouldSignOut) return;

    logout();
  }, [logout]);

  useEffect(() => {
    window.document.title = 'Dashboard - Aria';
  }, []);

  return (
    <>
      <Stack space={4}>
        <Toolbar
          padding={2}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {user && (
            <Button
              onClick={handleUserClick}
              text={`${user.firstName} ${user.lastName}`}
              variant="minimal"
            />
          )}
        </Toolbar>
        <Box
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 768,
            width: '100vw',
          }}
        >
          <Fade in={loading}>
            <LoadingIndicator>LOADING SONGS...</LoadingIndicator>
          </Fade>
          <Fade in={!loading}>
            <SongList
              onDelete={handleSongDelete}
              onOpen={handleSongOpen}
              songs={data && data.songs.data}
            />
          </Fade>
        </Box>
        <Box
          bottom={4}
          right={4}
          sx={{
            position: 'absolute',
          }}
        >
          <Button
            color="backgroundContrast"
            onClick={handleAddSongClick}
            startIcon={<AddIcon />}
            text="Add Song"
            variant="contained"
          />
        </Box>
      </Stack>
      <AddSongDialog
        isOpen={isAddSongDialogOpen}
        onIsOpenChange={handleAddSongDialogIsOpenChange}
      />
    </>
  );
};
