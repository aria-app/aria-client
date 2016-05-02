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
  toolType,
}) => h('.sequence', [
  h(SequenceToolbarContainer, { toolType }),
  h(ScrollTo, {
    center: true,
  }, h('.sequence__content', [
    h('.sequence__wrapper', [
      h(Keys, {
        playNote,
        scale,
      }),
      h(Grid, {
        playNote,
        scale,
        toolType,
      }),
    ]),
  ])),
]);

const composed = compose([
  setPropTypes({
    selectedNote: React.PropTypes.object,
    scale: React.PropTypes.array,
    toolType: React.PropTypes.string,
  }),
  pure,
])(component);

export const Sequence = composed;
