import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { ThemeProvider } from 'styled-components/macro';
import 'storybook-chromatic';
import shared from '../src/features/shared';

const { Shell } = shared.components;
const { themes } = shared.styles;

const req = require.context('../src/features', true, /\.stories\.js$/);

function loadStories() {
  addDecorator(storyFn => (
    <ThemeProvider
      theme={themes.emerald}>
      <Shell>
        {storyFn()}
      </Shell>
    </ThemeProvider>
  ));
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
