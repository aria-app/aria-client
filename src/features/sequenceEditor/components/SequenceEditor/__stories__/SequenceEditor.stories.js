import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { SequenceEditor } from '../SequenceEditor';
import * as constants from '../../../constants';
import './SequenceEditorBasics.story.scss';

storiesOf('SequenceEditor', module)
  .addDecorator(withKnobs)
  .add('Basics', () => (
    <div
      className="SequenceEditorBasics">
      <SequenceEditor
        measureCount={number('measure count', 1)}
        notes={[]}
        onKeyPress={action('KEY_PRESSED')}
        onClose={action('CLOSED')}
        onDelete={action('DELETED')}
        onDeselectAll={action('ALL_DESELECTED')}
        onDrag={action('DRAGGED')}
        onDraw={action('DREW')}
        onDuplicate={action('DUPLICATED')}
        onErase={action('ERASED')}
        onNudge={action('NUDGED')}
        onOctaveDown={action('MOVED_OCTAVE_DOWN')}
        onOctaveUp={action('MOVED_OCTAVE_UP')}
        onResize={action('SELECTED')}
        onSelect={action('SELECTED')}
        onSelectAll={action('ALL_SELECTED')}
        onSelectInArea={action('AREA_SELECTED')}
        onToolSelect={action('TOOL_SELECTED')}
        selectedNotes={[]}
        toolType={select('tool type', {
          [constants.toolTypes.SELECT]: 'Select',
          [constants.toolTypes.DRAW]: 'Draw',
          [constants.toolTypes.ERASE]: 'Erase',
          [constants.toolTypes.PAN]: 'Pan',
        }, constants.toolTypes.SELECT)}
      />
    </div>
  ));