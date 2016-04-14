import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import './zen-sequence-toolbar.scss';
import { getType, synths } from 'helpers/zen-synths/zen-synths';
import { tools } from 'helpers/zen-tools/zen-tools';

export const ZenSequenceToolbar = React.createClass({
  propTypes: {
    requestSetSynth: React.PropTypes.func,
    requestSetTool: React.PropTypes.func,
    synth: React.PropTypes.object,
    tool: React.PropTypes.oneOf(tools),
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
  },
  render() {
    const toolButtons = tools.map(this.getToolButton);
    const synthButtons = synths.map(this.getSynthButton);
    return (
      h('.zen-sequence-toolbar', [
        toolButtons,
        h('.zen-sequence-toolbar__right', synthButtons),
      ])
    );
  },
  getSynthButton(synth, index) {
    const className = classnames({
      'zen-sequence-toolbar__button--active':
        synth === getType(this.props.synth),
    }, `zen-sequence-toolbar__button--${synth}`);
    return h('.zen-sequence-toolbar__button', {
      key: index,
      className,
      onClick: () => this.props.requestSetSynth(synth),
    }, synth);
  },
  getToolButton(tool, index) {
    const className = classnames({
      'zen-sequence-toolbar__button--active':
        tool === this.props.tool,
    }, `zen-sequence-toolbar__button--${tool}`);
    return h('.zen-sequence-toolbar__button', {
      key: index,
      className,
      onClick: () => this.props.requestSetTool(tool),
    }, tool);
  },
});
