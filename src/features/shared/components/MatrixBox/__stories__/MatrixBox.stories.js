import h from 'react-hyperscript';
import { storiesOf } from '@storybook/react';
import { MatrixBox } from '../MatrixBox';

storiesOf('MatrixBox', module)
  .add('Basics', () =>
    h('.app', {
      style: {
        padding: 16,
      },
    }, [
      h(MatrixBox, {
        matrix: [
          [1, 0, 2],
          [2, 1, 0],
          [0, 2, 1],
        ],
      }),
    ]),
  );
