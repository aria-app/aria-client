import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { compact, first, isNil, max, uniqueId } from 'lodash';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Sequence, Song, Track } from '../../../../types';
import {
  ClientProvider,
  CreateSequenceResponse,
  CreateSequenceVariables,
  CreateTrackResponse,
  CreateTrackVariables,
  DeleteSequenceResponse,
  DeleteSequenceVariables,
  DeleteTrackResponse,
  DeleteTrackVariables,
  DuplicateSequenceResponse,
  DuplicateSequenceVariables,
  GetSongResponse,
  GetSongVariables,
  GetVoicesResponse,
  GetVoicesVariables,
  UpdateSequenceResponse,
  UpdateSequenceVariables,
  UpdateSongResponse,
  UpdateSongVariables,
  UpdateTrackResponse,
  UpdateTrackVariables,
} from '../../../api';
import { AudioProvider } from '../../../audio';
import { Shell } from '../../../shared';
import { TracksEditor } from '../TracksEditor';

const voices = [
  {
    id: 1,
    name: 'PWM',
    toneOscillatorType: 'pwm',
  },
  {
    id: 2,
    name: 'Sawtooth',
    toneOscillatorType: 'sawtooth',
  },
  {
    id: 3,
    name: 'Sine',
    toneOscillatorType: 'sine',
  },
];

const state = {
  song: {
    __typename: 'Song',
    bpm: 100,
    createdAt: '2021-01-01T00:00:00Z',
    id: 100,
    measureCount: 4,
    name: 'Song 1',
    tracks: [
      {
        __typename: 'Track',
        id: 100,
        isMuted: false,
        isSoloing: false,
        position: 1,
        sequences: [
          {
            __typename: 'Sequence',
            id: 100,
            measureCount: 1,
            notes: [],
            position: 0,
            track: { id: 100 },
          },
          {
            __typename: 'Sequence',
            id: 200,
            measureCount: 2,
            notes: [],
            position: 2,
            track: { id: 100 },
          },
        ],
        song: { id: 100 },
        voice: voices[0],
        volume: 1,
      },
    ],
    updatedAt: '2021-01-01T00:00:00Z',
    user: { id: 100 },
  } as Song,
};

export default {
  component: TracksEditor,
  title: 'TracksEditor/TracksEditor',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.mutation<CreateSequenceResponse, CreateSequenceVariables>(
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
            ctx.data({
              createSequence: {
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.mutation<CreateTrackResponse, CreateTrackVariables>(
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
              id: songId,
            },
            voice: voices[0],
            volume: 0,
          };

          state.song = {
            ...state.song,
            tracks: [...state.song.tracks, newTrack],
          };

          return res(
            ctx.data({
              createTrack: {
                track: newTrack,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteSequenceResponse, DeleteSequenceVariables>(
        'DeleteSequence',
        (req, res, ctx) => {
          const { id } = req.variables;

          state.song = {
            ...state.song,
            tracks: state.song.tracks.map((track) => ({
              ...track,
              sequences: track.sequences.filter(
                (sequence) => sequence.id !== id,
              ),
            })),
          };

          return res(
            ctx.data({
              deleteSequence: {
                success: true,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteTrackResponse, DeleteTrackVariables>(
        'DeleteTrack',
        (req, res, ctx) => {
          const { id } = req.variables;

          state.song = {
            ...state.song,
            tracks: state.song.tracks.filter((track) => track.id !== id),
          };

          return res(
            ctx.data({
              deleteTrack: {
                success: true,
              },
            }),
          );
        },
      ),
      graphql.mutation<DuplicateSequenceResponse, DuplicateSequenceVariables>(
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
            ctx.data({
              duplicateSequence: {
                sequence: newSequence,
              },
            }),
          );
        },
      ),
      graphql.query<GetSongResponse, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data({
              song: state.song,
            }),
          );
        },
      ),
      graphql.query<GetVoicesResponse, GetVoicesVariables>(
        'GetVoices',
        (req, res, ctx) => {
          return res(
            ctx.data({
              voices,
            }),
          );
        },
      ),
      graphql.mutation<UpdateSequenceResponse, UpdateSequenceVariables>(
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
            ctx.data({
              updateSequence: {
                sequence: updatedSequence,
              },
            }),
          );
        },
      ),
      graphql.mutation<UpdateSongResponse, UpdateSongVariables>(
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
            ctx.data({
              updateSong: {
                song: state.song,
              },
            }),
          );
        },
      ),
      graphql.mutation<UpdateTrackResponse, UpdateTrackVariables>(
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
              ? voices.find((voice) => voice.id === voiceId) ||
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
            ctx.data({
              updateTrack: {
                track: updatedTrack,
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [];

export const Default: Story<any> = (args) => (
  <ClientProvider>
    <RecoilRoot>
      <MockedProvider mocks={mocks}>
        <AudioProvider>
          <MemoryRouter initialEntries={['/1']}>
            <Shell>
              <Switch>
                <Route path="/:songId">
                  <TracksEditor {...args} />
                </Route>
              </Switch>
            </Shell>
          </MemoryRouter>
        </AudioProvider>
      </MockedProvider>
    </RecoilRoot>
  </ClientProvider>
);
