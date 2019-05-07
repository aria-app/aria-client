import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { DawwwTesting } from './DawwwTesting.story';

storiesOf('Dawww', module)
  .addDecorator(withKnobs)
  .add('Testing', () => <DawwwTesting />);
