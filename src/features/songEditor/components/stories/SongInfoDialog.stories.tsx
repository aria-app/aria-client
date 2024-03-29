import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';

import { Song } from '../../../../types';
import {
  ClientProvider,
  DeleteSongData,
  DeleteSongVariables,
} from '../../../api';
import { getMockRouterDecorator } from '../../../shared';
import { SongInfoDialog, SongInfoDialogProps } from '../SongInfoDialog';

const song: Song = {
  __typename: 'Song',
  bpm: 100,
  createdAt: '2021-01-01',
  id: 1,
  measureCount: 4,
  name: 'Song 1',
  tracks: [],
  updatedAt: '2021-01-01',
  user: {
    __typename: 'User',
    id: 1,
  },
};

export default {
  component: SongInfoDialog,
  decorators: [getMockRouterDecorator()],
  title: 'SongEditor/SongInfoDialog',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.mutation<DeleteSongData, DeleteSongVariables>(
        'DeleteSong',
        (req, res, ctx) => {
          return res(
            ctx.data<DeleteSongData>({
              deleteSong: {
                __typename: 'DeleteSongResponse',
                song,
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

export const Default: Story<SongInfoDialogProps> = (args) => (
  <ClientProvider>
    <SongInfoDialog {...args} />
  </ClientProvider>
);

Default.args = {
  isOpen: true,
  song,
};
