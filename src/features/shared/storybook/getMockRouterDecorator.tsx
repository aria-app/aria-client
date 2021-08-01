import { action } from '@storybook/addon-actions';
import { StoryContext } from '@storybook/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { useEffect, useRef } from 'react';
import { Router } from 'react-router-dom';

export type GetMockRouterDecorator = (options?: {
  initialEntries?: string[];
}) => (story: () => any, context: StoryContext) => any;

export const getMockRouterDecorator: GetMockRouterDecorator =
  ({ initialEntries = ['/'] } = {}) =>
  (Story) => {
    const history = useRef<MemoryHistory>(
      createMemoryHistory({ initialEntries }),
    );

    useEffect(() => {
      history.current.listen((location, actionType) => {
        if (actionType === 'PUSH') {
          action('MockRouter.onHistoryPush')(location);
        }

        if (actionType === 'REPLACE') {
          action('MockRouter.onHistoryReplace')(location);
        }
      });
    }, [history]);

    return <Router history={history.current}>{Story()}</Router>;
  };
