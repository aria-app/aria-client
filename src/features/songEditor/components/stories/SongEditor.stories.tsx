import { Meta, Story } from '@storybook/react';
import {
  compact,
  first,
  isNil,
  max,
  orderBy,
  partition,
  uniqueId,
} from 'lodash';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import * as fixtures from '../../../../fixtures';
import { Sequence, Track } from '../../../../types';
import {
  ClientProvider,
  CreateSequenceData,
  CreateSequenceVariables,
  CreateTrackData,
  CreateTrackVariables,
  CurrentUserData,
  CurrentUserVariables,
  DeleteSequenceData,
  DeleteSequenceVariables,
  DeleteTrackData,
  DeleteTrackVariables,
  DuplicateSequenceData,
  DuplicateSequenceVariables,
  GetSongData,
  GetSongVariables,
  GetVoicesData,
  GetVoicesVariables,
  UpdateSequenceData,
  UpdateSequenceVariables,
  UpdateSongData,
  UpdateSongVariables,
  UpdateTrackData,
  UpdateTrackVariables,
} from '../../../api';
import { AudioProvider } from '../../../audio';
import { AuthProvider } from '../../../auth';
import { Shell } from '../../../shared';
import { SongEditor } from '../SongEditor';

const state = {
  song: fixtures.song,
};

export default {
  component: SongEditor,
  title: 'SongEditor/SongEditor',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.mutation<CreateSequenceData, CreateSequenceVariables>(
        'CreateSequence',
        (req, res, ctx) => {
          const {
            input: { position, trackId },
          } = req.variables;

          const newSequence: Sequence = {
            __typename: 'Sequence',
            id: parseInt(uniqueId()),
            measureCount: 1,
            notes: [],
            position,
            track: {
              __typename: 'Track',
              id: trackId,
            },
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === trackId
                ? {
                    ...track,
                    sequences: [...track.sequences, newSequence],
                  }
                : track,
            ),
          };

          return res(
            ctx.data<CreateSequenceData>({
              createSequence: {
                __typename: 'CreateSequenceResponse',
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.mutation<CreateTrackData, CreateTrackVariables>(
        'CreateTrack',
        (req, res, ctx) => {
          const {
            input: { songId },
          } = req.variables;

          const prevMaxPosition =
            max(state.song.tracks.map((track) => track.position)) || 0;

          const newTrack: Track = {
            __typename: 'Track',
            id: parseInt(uniqueId()),
            isMuted: false,
            isSoloing: false,
            position: prevMaxPosition + 1,
            sequences: [],
            song: {
              __typename: 'Song',
              id: songId,
            },
            voice: fixtures.voices[0],
            volume: 0,
          };

          state.song = {
            ...state.song,
            tracks: [...state.song.tracks, newTrack],
          };

          return res(
            ctx.data<CreateTrackData>({
              createTrack: {
                __typename: 'CreateTrackResponse',
                track: newTrack,
              },
            }),
          );
        },
      ),
      graphql.query<CurrentUserData, CurrentUserVariables>(
        'CurrentUser',
        (req, res, ctx) =>
          res(
            ctx.data<CurrentUserData>({
              currentUser: fixtures.user,
            }),
          ),
      ),
      graphql.mutation<DeleteSequenceData, DeleteSequenceVariables>(
        'DeleteSequence',
        (req, res, ctx) => {
          const { id } = req.variables;

          const parentTrack = state.song.tracks.find((track) =>
            track.sequences.some((sequence) => sequence.id === id),
          );

          if (!parentTrack) {
            return res(ctx.errors([{ message: 'Could not delete sequence' }]));
          }

          const [deletedSequences, sequencesWithoutDeleted] = partition(
            parentTrack.sequences,
            (sequence) => sequence.id === id,
          );

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) => ({
              ...track,
              sequences: sequencesWithoutDeleted,
            })),
          };

          return res(
            ctx.data<DeleteSequenceData>({
              deleteSequence: {
                __typename: 'DeleteSequenceResponse',
                sequence: deletedSequences[0],
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteTrackData, DeleteTrackVariables>(
        'DeleteTrack',
        (req, res, ctx) => {
          const { id } = req.variables;

          const [deletedTracks, tracksWithoutDeleted] = partition(
            state.song.tracks,
            (track) => track.id === id,
          );

          state.song = {
            ...state.song,
            tracks: tracksWithoutDeleted,
          };

          return res(
            ctx.data<DeleteTrackData>({
              deleteTrack: {
                __typename: 'DeleteTrackResponse',
                track: deletedTracks[0],
              },
            }),
          );
        },
      ),
      graphql.mutation<DuplicateSequenceData, DuplicateSequenceVariables>(
        'DuplicateSequence',
        (req, res, ctx) => {
          const { id } = req.variables;

          const existingSequence = first(
            compact(
              state.song.tracks.map((track) =>
                first(track.sequences.filter((sequence) => sequence.id === id)),
              ),
            ),
          );

          if (!existingSequence) {
            return res(
              ctx.errors([
                { message: 'No sequence matching that ID to duplicate' },
              ]),
            );
          }

          const newSequence = {
            ...existingSequence,
            id: parseInt(uniqueId()),
            notes: existingSequence.notes.map((note) => ({
              ...note,
              id: parseInt(uniqueId()),
            })),
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === existingSequence.track.id
                ? {
                    ...track,
                    sequences: [...track.sequences, newSequence],
                  }
                : track,
            ),
          };

          return res(
            ctx.data<DuplicateSequenceData>({
              duplicateSequence: {
                __typename: 'DuplicateSequenceResponse',
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.query<GetSongData, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data<GetSongData>({
              song: state.song,
            }),
          );
        },
      ),
      graphql.query<GetVoicesData, GetVoicesVariables>(
        'GetVoices',
        (req, res, ctx) => {
          return res(
            ctx.data<GetVoicesData>({
              voices: {
                __typename: 'VoicesResponse',
                data: orderBy(
                  fixtures.voices,
                  req.variables.sort,
                  req.variables.sortDirection,
                ),
                meta: {
                  __typename: 'PaginationMetadata',
                  currentPage: 1,
                  itemsPerPage: 10,
                  totalItemCount: 2,
                },
              },
            }),
          );
        },
      ),
      graphql.mutation<UpdateSequenceData, UpdateSequenceVariables>(
        'UpdateSequence',
        (req, res, ctx) => {
          const {
            input: { id, measureCount, position },
          } = req.variables;

          const existingSequence = first(
            compact(
              state.song.tracks.map((track) =>
                first(track.sequences.filter((sequence) => sequence.id === id)),
              ),
            ),
          );

          if (!existingSequence) {
            return res(
              ctx.errors([
                { message: 'No sequence matching that ID to update' },
              ]),
            );
          }

          const updatedSequence = {
            ...existingSequence,
            measureCount: !isNil(measureCount)
              ? measureCount
              : existingSequence.measureCount,
            position: !isNil(position) ? position : existingSequence.position,
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === existingSequence.track.id
                ? {
                    ...track,
                    sequences: track.sequences.map((sequence) =>
                      sequence.id === id ? updatedSequence : sequence,
                    ),
                  }
                : track,
            ),
          };

          return res(
            ctx.data<UpdateSequenceData>({
              updateSequence: {
                __typename: 'UpdateSequenceResponse',
                sequence: updatedSequence,
              },
            }),
          );
        },
      ),
      graphql.mutation<UpdateSongData, UpdateSongVariables>(
        'UpdateSong',
        (req, res, ctx) => {
          const {
            input: { bpm, measureCount, name },
          } = req.variables;

          state.song = {
            ...state.song,
            bpm: !isNil(bpm) ? bpm : state.song.bpm,
            measureCount: !isNil(measureCount)
              ? measureCount
              : state.song.measureCount,
            name: !isNil(name) ? name : state.song.name,
          };

          return res(
            ctx.data<UpdateSongData>({
              updateSong: {
                __typename: 'UpdateSongResponse',
                song: state.song,
              },
            }),
          );
        },
      ),
      graphql.mutation<UpdateTrackData, UpdateTrackVariables>(
        'UpdateTrack',
        (req, res, ctx) => {
          const {
            input: { id, voiceId, volume },
          } = req.variables;

          const existingTrack = state.song.tracks.find(
            (track) => track.id === id,
          );

          if (!existingTrack) {
            return res(
              ctx.errors([{ message: 'No track matching that ID to update' }]),
            );
          }

          const updatedTrack = {
            ...existingTrack,
            voice: !isNil(voiceId)
              ? fixtures.voices.find((voice) => voice.id === voiceId) ||
                existingTrack.voice
              : existingTrack.voice,
            volume: !isNil(volume) ? volume : existingTrack.volume,
          };

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) =>
              track.id === id ? updatedTrack : track,
            ),
          };

          return res(
            ctx.data<UpdateTrackData>({
              updateTrack: {
                __typename: 'UpdateTrackResponse',
                track: updatedTrack,
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

export const Default: Story<any> = (args) => (
  <RecoilRoot>
    <ClientProvider>
      <AuthProvider>
        <AudioProvider>
          <MemoryRouter initialEntries={[`/${state.song.id}`]}>
            <Shell>
              <Switch>
                <Route path="/:songId">
                  <SongEditor {...args} />
                </Route>
              </Switch>
            </Shell>
          </MemoryRouter>
        </AudioProvider>
      </AuthProvider>
    </ClientProvider>
  </RecoilRoot>
);
