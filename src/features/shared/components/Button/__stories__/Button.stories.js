import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Button } from '../Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      className="app"
      style={{
        alignItems: 'flex-start',
      }}>
      {story()}
    </div>
  ))
  .add('Basics', () => (
    <Button
      text={text('Text', 'some text')}
    />
  ));
