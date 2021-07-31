import { Box } from 'aria-ui';
import find from 'lodash/fp/find';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

import {
  getCreateSequenceMutationUpdater,
  getCreateSequenceOptimisticResponse,
  getCreateTrackOptimisticResponse,
  getDeleteSequenceMutationUpdater,
  getDeleteTrackMutationUpdater,
  getTempId,
  getUpdateSequenceMutationUpdater,
  getUpdateSequenceOptimisticResponse,
  useCreateSequence,
  useCreateTrack,
  useDeleteSequence,
  useDeleteTrack,
  useDuplicateSequence,
  useGetSong,
  useUpdateSequence,
  useUpdateSong,
  useUpdateTrack,
} from '../../api';
import { useAudioManager, usePlaybackState, usePosition } from '../../audio';
import { LoadingIndicator, Timeline } from '../../shared';
import {
  TrackEditingModal,
  TrackEditingModalTrackChangeHandler,
} from './TrackEditingModal';
import { TrackList } from './TrackList';
import { TracksEditorToolbar } from './TracksEditorToolbar';

export interface TracksEditorParams {
  songId: string;
}

export type TracksEditorProps = Record<string, never>;

export const TracksEditor: FC<TracksEditorProps> = () => {
  const { songId: songIdProp } = useParams<TracksEditorParams>();
  const songId = songIdProp ? parseInt(songIdProp) : -1;
  const audioManager = useAudioManager();
  const [createSequence] = useCreateSequence();
  const [createTrack] = useCreateTrack();
  const [deleteSequence] = useDeleteSequence();
  const [deleteTrack] = useDeleteTrack();
  const [, duplicateSequence] = useDuplicateSequence();
  const history = useHistory();
  const { data, error, loading } = useGetSong({
    variables: {
      id: songId,
    },
  });
  const playbackState = usePlaybackState();
  const position = usePosition();
  const { url } = useRouteMatch();
  const [updateSequence] = useUpdateSequence();
  const [, updateSong] = useUpdateSong();
  const [, updateTrack] = useUpdateTrack();
  const [selectedSequenceId, setSelectedSequenceId] = useState<number>();
  const [selectedTrackId, setSelectedTrackId] = useState<number>();

  const tracks = useMemo(() => {
    return data?.song?.tracks ?? [];
  }, [data]);

  const sequences = useMemo(() => {
    if (!data) {
      return [];
    }

    return tracks.map((track) => track.sequences).flat();
  }, [data, tracks]);

  const selectedSequence = useMemo(
    () => find((s) => s.id === selectedSequenceId, sequences),
    [selectedSequenceId, sequences],
  );

  const selectedTrack = useMemo(
    () => find((t) => t.id === selectedTrackId, tracks),
    [selectedTrackId, tracks],
  );

  const handleSequenceAdd = useCallback(
    ({ position, track }) => {
      const variables = {
        input: { position, trackId: track.id },
      };

      createSequence({
        optimisticResponse: getCreateSequenceOptimisticResponse(variables),
        update: getCreateSequenceMutationUpdater(variables, { songId }),
        variables,
      });
    },
    [createSequence, songId],
  );

  const handleSequenceDelete = useCallback(
    (e) => {
      e.preventDefault();

      if (!selectedSequence) return;

      const variables = { id: selectedSequence.id };

      deleteSequence({
        update: getDeleteSequenceMutationUpdater(variables, { songId }),
        variables,
      });
    },
    [deleteSequence, selectedSequence, songId],
  );

  const handleSequenceDuplicate = useCallback(
    async (e) => {
      e.preventDefault();

      if (!selectedSequence) return;

      const tempId = getTempId();

      setSelectedSequenceId(tempId);

      const { data } = await duplicateSequence({
        id: selectedSequence.id,
      });

      if (data?.duplicateSequence.sequence) {
        setSelectedSequenceId(data?.duplicateSequence.sequence.id);
      }
    },
    [duplicateSequence, selectedSequence],
  );

  const handleSequenceEdit = useCallback(
    (sequence) => {
      const variables = {
        input: {
          id: sequence.id,
          measureCount: sequence.measureCount,
          position: sequence.position,
        },
      };

      updateSequence({
        optimisticResponse: getUpdateSequenceOptimisticResponse(variables, {
          updatedSequence: sequence,
        }),
        update: getUpdateSequenceMutationUpdater(variables, { songId }),
        variables,
      });
    },
    [songId, updateSequence],
  );

  const handleSequenceOpen = useCallback(
    (sequence) => {
      history.push(`${url}/sequence/${sequence.id}`);
    },
    [history, url],
  );

  const handleSongMeasureCountChange = useCallback(
    (measureCount) => {
      if (!data?.song) return;

      updateSong({
        input: {
          id: data?.song.id,
          measureCount,
        },
      });
    },
    [data, updateSong],
  );

  const handleToolbarSequenceOpen = useCallback(() => {
    history.push(`${url}/sequence/${selectedSequence?.id}`);
  }, [history, url, selectedSequence]);

  const handleTrackDeselect = useCallback(() => {
    setSelectedTrackId(-1);
  }, []);

  const handleTrackDelete = useCallback(
    (track) => {
      handleTrackDeselect();

      const variables = { id: track.id };

      deleteTrack({
        update: getDeleteTrackMutationUpdater(variables, { songId }),
        variables,
      });
    },
    [deleteTrack, handleTrackDeselect, songId],
  );

  const handleTrackEdit = useCallback<TrackEditingModalTrackChangeHandler>(
    ({ id, voiceId, volume }) => {
      updateTrack({
        input: { id, voiceId, volume },
      });
    },
    [updateTrack],
  );

  const handleTrackListPositionSet = useCallback(
    (position) => {
      audioManager.setPosition(position);
    },
    [audioManager],
  );

  const handleTrackListSequenceDeselect = useCallback(() => {
    setSelectedSequenceId(-1);
  }, []);

  const handleTrackListSequenceSelect = useCallback((sequence) => {
    setSelectedSequenceId(sequence.id);
  }, []);

  const handleTrackListTrackAdd = useCallback(() => {
    const variables = { input: { songId } };

    createTrack({
      optimisticResponse: getCreateTrackOptimisticResponse(variables),
      variables,
    });
  }, [createTrack, songId]);

  const handleTrackSelect = useCallback((track) => {
    setSelectedTrackId(track.id);
  }, []);

  useEffect(() => {
    if (!data) return;

    audioManager.updateSong(data.song);
  }, [audioManager, data]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <GlobalHotKeys
        allowChanges={true}
        handlers={{
          DELETE: handleSequenceDelete,
          DUPLICATE: handleSequenceDuplicate,
        }}
        keyMap={{
          DELETE: ['backspace', 'del'],
          DUPLICATE: ['ctrl+shift+d', 'meta+shift+d'],
        }}
      />
      {loading && <LoadingIndicator>LOADING SONG...</LoadingIndicator>}
      {!loading && error && <div>Failed to load song</div>}
      {!loading && !error && (
        <>
          <TrackList
            onPositionSet={handleTrackListPositionSet}
            onSequenceAdd={handleSequenceAdd}
            onSequenceDeselect={handleTrackListSequenceDeselect}
            onSequenceEdit={handleSequenceEdit}
            onSequenceOpen={handleSequenceOpen}
            onSequenceSelect={handleTrackListSequenceSelect}
            onSongMeasureCountChange={handleSongMeasureCountChange}
            onTrackAdd={handleTrackListTrackAdd}
            onTrackStage={handleTrackSelect}
            selectedSequence={selectedSequence}
            songMeasureCount={data?.song?.measureCount ?? 0}
            tracks={tracks}
          />
          <TracksEditorToolbar
            onSequenceDelete={handleSequenceDelete}
            onSequenceDuplicate={handleSequenceDuplicate}
            onSequenceOpen={handleToolbarSequenceOpen}
            selectedSequence={selectedSequence}
          />
        </>
      )}
      <Timeline
        isVisible={
          playbackState !== audioManager.constants.PLAYBACK_STATES.STOPPED
        }
        offset={position * 2 + 16}
      />
      {!loading && (
        <TrackEditingModal
          onClose={handleTrackDeselect}
          onDelete={handleTrackDelete}
          onTrackChange={handleTrackEdit}
          track={selectedTrack}
        />
      )}
    </Box>
  );
};
