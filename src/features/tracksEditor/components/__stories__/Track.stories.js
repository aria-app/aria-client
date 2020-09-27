import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { TrackDynamic } from './TrackDynamic.story';

storiesOf('Track', module)
  .addDecorator(withKnobs)
  .add('Dynamic', () => <TrackDynamic />);
