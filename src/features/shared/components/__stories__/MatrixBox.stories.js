import React from 'react';
import { storiesOf } from '@storybook/react';
import MatrixBox from '../MatrixBox';

storiesOf('MatrixBox', module).add('Basics', () => (
  <div
    className="app"
    style={{
      padding: 16,
    }}
  >
    <MatrixBox matrix={[[1, 0, 2], [2, 1, 0], [0, 2, 1]]} />
  </div>
));
