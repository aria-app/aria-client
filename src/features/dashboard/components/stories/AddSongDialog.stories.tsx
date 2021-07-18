import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { formatISO } from 'date-fns';
import { GraphQLError } from 'graphql';

import {
  CREATE_SONG,
  CreateSongResponse,
  CreateSongVariables,
} from '../../../api';
import { AddSongDialog, AddSongDialogProps } from '../AddSongDialog';

export default {
  component: AddSongDialog,
  title: 'Dashboard/AddSongDialog',
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: CREATE_SONG,
      variables: {
        input: {
          name: 'New Song',
        },
      } as CreateSongVariables,
    },
    result: {
      data: {
        createSong: {
          message: 'Song was created.',
          song: {
            id: 2,
            name: 'New Song',
            updatedAt: formatISO(new Date(), { representation: 'date' }),
          },
          success: true,
        },
      } as CreateSongResponse,
    },
  },
  {
    request: {
      query: CREATE_SONG,
      variables: {
        input: {
          name: 'Same',
        },
      } as CreateSongVariables,
    },
    result: {
      errors: [
        new GraphQLError(
          'You already have a song with that name. Please select another.',
        ),
      ],
    },
  },
];

export const Default: Story<AddSongDialogProps> = (args) => (
  <MockedProvider mocks={mocks}>
    <AddSongDialog {...args} />
  </MockedProvider>
);

Default.args = {
  isOpen: true,
};
