import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { BoxesDynamic } from './BoxesDynamic.story';

storiesOf('Boxes', module)
  .addDecorator(withKnobs)
  .add('Dynamic', () => <BoxesDynamic />);
