import h from 'react-hyperscript';
import { action, storiesOf } from '@storybook/react';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { Sequencer } from '../sequencer';
import shared from '../../../../shared';
import './sequencer-basics.story.scss';

const { toolTypes } = shared.constants;

storiesOf('Sequencer', module)
  .addDecorator(withKnobs)
  .add('Basics', () =>
    h('.SequencerBasics', [
      h(Sequencer, {
        activeSequenceId: 'my-sequence',
        measureCount: number('measure count', 1),
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
        toolType: select('tool type', {
          [toolTypes.SELECT]: 'Select',
          [toolTypes.DRAW]: 'Draw',
          [toolTypes.ERASE]: 'Erase',
          [toolTypes.PAN]: 'Pan',
        }, toolTypes.SELECT),
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      }),
    ]),
  );
