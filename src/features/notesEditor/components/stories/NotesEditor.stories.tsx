import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
} from '@reach/router';
import { Meta, Story } from '@storybook/react';
import { Box } from 'aria-ui';
import { FC, ProviderProps, useRef } from 'react';

import { Dawww } from '../../../../dawww';
import { I18NWrapper } from '../../../../i18n';
import { Sequence } from '../../../../types';
import {
  GET_SEQUENCE,
  GetSequenceInput,
  GetSequenceResponse,
} from '../../../api';
import { AudioManagerContext } from '../../../audio/contexts';
import { NotesEditor } from '../NotesEditor';

export default {
  component: NotesEditor,
  title: 'NotesEditor/NotesEditor',
  argTypes: {
    default: { table: { disable: true } },
    location: { table: { disable: true } },
    navigate: { table: { disable: true } },
    path: { table: { disable: true } },
    sequenceId: { table: { disable: true } },
    uri: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const MockAudioProvider: FC<Partial<ProviderProps<any>>> = (props) => {
  const audioManager = useRef({
    ...Dawww({}),
    preview: () => {},
    updateSequence: () => {},
  });

  return (
    <AudioManagerContext.Provider value={audioManager.current} {...props} />
  );
};

const source = createMemorySource('/1');
const history = createHistory(source);

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    delay: 0,
    request: {
      query: GET_SEQUENCE,
      variables: { id: 1 } as GetSequenceInput,
    },
    result: {
      data: {
        sequence: {
          id: 1,
          measureCount: 1,
          notes: [
            {
              id: 1,
              points: [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
              ],
              sequence: { id: 1 },
            },
            {
              id: 2,
              points: [
                { x: 2, y: 2 },
                { x: 3, y: 2 },
              ],
              sequence: { id: 1 },
            },
          ],
          position: 0,
          track: { id: 1 },
        } as Sequence,
      } as GetSequenceResponse,
    },
  },
];

export const Default: Story<any> = (args) => (
  <MockedProvider mocks={mocks}>
    <MockAudioProvider>
      <I18NWrapper>
        <LocationProvider history={history}>
          <Box
            as={Router}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <NotesEditor {...args} path="/:sequenceId" />
          </Box>
        </LocationProvider>
      </I18NWrapper>
    </MockAudioProvider>
  </MockedProvider>
);
