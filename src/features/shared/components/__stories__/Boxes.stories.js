import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { BoxesDynamic } from './BoxesDynamic.story';

storiesOf('Boxes', module)
  .addDecorator(withKnobs)
  .add('Dynamic', () => <BoxesDynamic />);
