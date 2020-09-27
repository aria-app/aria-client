import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { SlotsBasics } from './slots-basics.story';

storiesOf('Slots', module)
  .addDecorator(withKnobs)
  .add('Basics', () => <SlotsBasics />);
