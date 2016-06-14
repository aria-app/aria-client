import React from 'react';
import h from 'react-hyperscript';
import { compose, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import classnames from 'classnames';
import { Sequence } from '../sequence/sequence';
import './track.scss';

const component = (props) => h('.track', {
  onClick: props.onTrackPress,
}, [
  h('.track__header', {
    onClick: props.onTrackSelect,
  }, [
    h('.track__header__title', [props.track.synthType]),
    h('.track__header__actions', [
      h('.track__header__action.track__header__action--mute', {
        className: classnames({
          'track__header__action--active': props.isMuted,
        }),
        onClick: props.onMutePress,
      }, ['M']),
      h('.track__header__action.track__header__action--solo', {
        className: classnames({
          'track__header__action--active': props.isSoloing,
        }),
        onClick: props.onSoloPress,
      }, ['S']),
    ]),
  ]),
  h('.track__sequences', {
    style: {
      width: props.songMeasureCount * 4 * 8 * 2,
    },
  }, [
    ...props.track.sequences.map(sequence => h(Sequence, {
      isSelected: sequence.id === props.selectedSequenceId,
      onSelect: props.selectSequence,
      openSequence: props.openSequence,
      onContextMenu: props.onSequenceContextMenu,
      sequence,
    })),
  ]),
]);

const composed = compose([
  setDisplayName('Track'),
  pure,
  setPropTypes({
    deselectSequence: React.PropTypes.func.isRequired,
    isMuted: React.PropTypes.bool.isRequired,
    isSoloing: React.PropTypes.bool.isRequired,
    onSequenceContextMenu: React.PropTypes.func.isRequired,
    openSequence: React.PropTypes.func.isRequired,
    onTrackSelect: React.PropTypes.func.isRequired,
    selectedSequenceId: React.PropTypes.string,
    selectSequence: React.PropTypes.func.isRequired,
    songMeasureCount: React.PropTypes.number.isRequired,
    toggleTrackIsMuted: React.PropTypes.func.isRequired,
    toggleTrackIsSoloing: React.PropTypes.func.isRequired,
    track: React.PropTypes.object.isRequired,
  }),
  withHandlers({
    onMutePress: (props) => (e) => {
      props.toggleTrackIsMuted(props.track.id);
      e.stopPropagation();
    },
    onSoloPress: (props) => (e) => {
      props.toggleTrackIsSoloing(props.track.id);
      e.stopPropagation();
    },
    onTrackSelect: (props) => () => {
      props.onTrackSelect(props.track);
    },
    onTrackPress: (props) => (e) => {
      props.deselectSequence();
      e.stopPropagation();
    },
    selectSequence: (props) => (id) => {
      props.selectSequence(id);
    },
  }),
])(component);

export const Track = composed;
