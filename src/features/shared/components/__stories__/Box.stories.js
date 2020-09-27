import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { BoxDynamic } from './BoxDynamic.story';

storiesOf('Box', module)
  .addDecorator(withKnobs)
  .add('Dynamic', () => <BoxDynamic />);
