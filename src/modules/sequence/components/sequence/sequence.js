import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { ScrollTo } from '../scroll-to/scroll-to';
import {
  SequenceToolbarContainer,
} from '../sequence-toolbar-container/sequence-toolbar-container';
import './sequence.scss';

const component = ({
  playNote,
  scale,
  tool,
}) => h('.sequence', [
  h(SequenceToolbarContainer, { tool }),
  h(ScrollTo, {
    centered: true,
  }, h('.sequence__content', [
    h('.sequence__wrapper', [
      h(Keys, {
        playNote,
        scale,
      }),
      h(Grid, {
        playNote,
        scale,
        tool,
      }),
    ]),
  ])),
]);

const composed = compose([
  setPropTypes({
    selectedNotes: React.PropTypes.array,
    scale: React.PropTypes.array,
    tool: React.PropTypes.string,
  }),
  pure,
])(component);

export const Sequence = composed;
