import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { Toolbar } from 'aria-ui';
import { FC, ProviderProps, useRef } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import { Dawww } from '../../../../dawww';
import { I18NWrapper } from '../../../../i18n';
import {
  GET_SEQUENCE,
  GetSequenceInput,
  GetSequenceResponse,
} from '../../../api';
import { AudioManagerContext } from '../../../audio/contexts';
import { Shell } from '../../../shared';
import { NotesEditor } from '../NotesEditor';

export default {
  component: NotesEditor,
  title: 'NotesEditor/NotesEditor',
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
                { x: 0, y: 34 },
                { x: 1, y: 34 },
              ],
              sequence: { id: 1 },
            },
            {
              id: 2,
              points: [
                { x: 2, y: 35 },
                { x: 3, y: 35 },
              ],
              sequence: { id: 1 },
            },
          ],
          position: 0,
          track: { id: 1 },
        },
      } as GetSequenceResponse,
    },
  },
];

export const Default: Story<any> = (args) => (
  <MockedProvider mocks={mocks}>
    <MockAudioProvider>
      <I18NWrapper>
        <MemoryRouter initialEntries={['/1']}>
          <Shell>
            <Toolbar />
            <Switch>
              <Route path="/:sequenceId">
                <NotesEditor {...args} />
              </Route>
            </Switch>
          </Shell>
        </MemoryRouter>
      </I18NWrapper>
    </MockAudioProvider>
  </MockedProvider>
);
