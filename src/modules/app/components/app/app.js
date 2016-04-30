import React from 'react';
import { connect } from 'react-redux';
import h from 'react-hyperscript';
import { compose, setPropTypes } from 'recompose';
import Mousetrap from 'mousetrap';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import './app.scss';

const { SequenceContainer } = sequence.components;

const component = () =>
  h('.app', [
    h(SequenceContainer),
  ]);

const composed = compose([
  setPropTypes({
    stop: React.PropTypes.func,
    togglePlayPause: React.PropTypes.func,
  }),
])(component);

const classified = React.createClass({
  componentWillMount() {
    Mousetrap.bind('enter', this.props.togglePlayPause);
    Mousetrap.bind('escape', this.props.stop);
    // Mousetrap.bind(['backspace', 'del'], this.deleteNotes);
  },
  render() {
    return h(composed, {
      ...this.props,
    }, this.props.children);
  },
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(classified);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    stop: () => {
      dispatch(sound.actions.stop());
    },
    togglePlayPause: () => {
      dispatch(sound.actions.togglePlayPause());
    },
  };
}
