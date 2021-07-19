import { useQuery } from '@apollo/client';
import { Box, Button, Fade, Stack, Toolbar } from 'aria-ui';
import AddIcon from 'mdi-react/AddIcon';
import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { GET_SONGS, useDeleteSong } from '../../api';
import { useAuth } from '../../auth';
import { LoadingIndicator } from '../../shared';
import { AddSongDialog } from './AddSongDialog';
import { SongList } from './SongList';

export type DashboardProps = Record<string, never>;

export const Dashboard: FC<DashboardProps> = () => {
  const history = useHistory();
  const { logout, user } = useAuth();
  const [deleteSong, { loading: deleteLoading }] = useDeleteSong();
  const { data, loading: getLoading } = useQuery(GET_SONGS, {
    fetchPolicy: 'cache-and-network',
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
          id: song.id,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [deleteSong],
  );

  const handleSongOpen = useCallback(
    (song) => {
      history.push?.(`edit-song/${song.id}`);
    },
    [history],
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
