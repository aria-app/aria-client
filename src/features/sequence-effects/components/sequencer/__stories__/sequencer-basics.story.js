import h from 'react-hyperscript';
import React from 'react';
import { action } from '@kadira/storybook';
import { Sequencer } from '../sequencer';
import shared from '../../../../shared';
import './sequencer-basics.story.scss';

export class SequencerBasics extends React.Component {
  // eslint-disable-next-line
  render() {
    return h('.SequencerBasics', [
      h(Sequencer, {
        activeSequenceId: 'my-sequence',
        measureCount: 8,
        notes: [],
        onKeyPress: action('KEY_PRESSED'),
        onClose: action('CLOSED'),
        onDelete: action('DELETED'),
        onDeselectAll: action('ALL_DESELECTED'),
        onDrag: action('DRAGGED'),
        onDraw: action('DREW'),
        onDuplicate: action('DUPLICATED'),
        onErase: action('ERASED'),
        onNudge: action('NUDGED'),
        onOctaveDown: action('MOVED_OCTAVE_DOWN'),
        onOctaveUp: action('MOVED_OCTAVE_UP'),
        onResize: action('SELECTED'),
        onSelect: action('SELECTED'),
        onSelectAll: action('ALL_SELECTED'),
        onSelectInArea: action('AREA_SELECTED'),
        onToolSelect: action('TOOL_SELECTED'),
        selectedNotes: [],
        toolType: shared.constants.defaultToolType,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      }),
    ]);
  }
}
