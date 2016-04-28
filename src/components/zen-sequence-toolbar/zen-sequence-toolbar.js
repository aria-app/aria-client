import { PropTypes } from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes } from 'recompose';
import { getType, synths } from '../../helpers/zen-synths/zen-synths';
import { tools } from '../../helpers/zen-tools/zen-tools';
import './zen-sequence-toolbar.scss';

const component = ({
  synthButtons,
  toolButtons,
}) =>
  h('.zen-sequence-toolbar', [
    ...toolButtons,
    h('.zen-sequence-toolbar__right', [
      ...synthButtons,
    ]),
  ]);

const button = ({
  isActive,
  key,
  onPress,
  text,
}) => h('.zen-sequence-toolbar__button', {
  className: classnames({
    'zen-sequence-toolbar__button--active': isActive,
  }),
  key,
  onClick: () => onPress(text),
}, text);

export const ZenSequenceToolbar = compose([
  setPropTypes({
    requestSetSynth: PropTypes.func,
    requestSetTool: PropTypes.func,
    currentSynth: PropTypes.object,
    currentTool: PropTypes.oneOf(tools),
  }),
  mapProps(({
    requestSetSynth,
    requestSetTool,
    currentSynth,
    currentTool,
    ...rest,
  }) => ({
    synthButtons: synths.map((synth, index) => button({
      key: index,
      className: classnames(),
      isActive: synth === getType(currentSynth),
      onPress: requestSetSynth,
      text: synth,
    })),
    toolButtons: tools.map((tool, index) => button({
      key: index,
      isActive: tool === currentTool,
      onPress: requestSetTool,
      text: tool,
    })),
    currentSynth,
    currentTool,
    ...rest,
  })),
  pure,
])(component);
