import React from 'react';
import h from 'react-hyperscript';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import shared from 'modules/shared';
import { Grid } from '../grid/grid';
import { Keys } from '../keys/keys';
import { ScrollTo } from '../scroll-to/scroll-to';
import {
  SequenceToolbarContainer,
} from '../sequence-toolbar-container/sequence-toolbar-container';
import './sequence.scss';

const { getChildRef } = shared.helpers;

const component = ({
  sequenceContentRef,
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
        sequenceContentRef,
        toolType,
      }),
    ]),
  ])),
]);

const composed = compose([
  setPropTypes({
    selectedNotes: React.PropTypes.array,
    scale: React.PropTypes.array,
    toolType: React.PropTypes.string,
  }),
  getChildRef('.sequence__content'),
  mapProps(props => ({
    ...props,
    sequenceContentRef: props.childRef,
  })),
  pure,
])(component);

export const Sequence = composed;
