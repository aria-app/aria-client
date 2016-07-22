import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from 'ducks/shared';
import './bpm-modal.scss';

const { DropdownList, Modal } = shared.components;
const { maxBPM, minBPM } = shared.constants;
const bpmRange = _.range(minBPM, maxBPM + 1).map(n => ({
  text: n,
  value: n,
}));

const component = props =>
  h(Modal, {
    className: 'bpm-modal',
    confirmText: 'DONE',
    isOpen: props.isOpen,
    onConfirm: props.close,
    titleText: 'Set BPM',
  }, [
    h('.bpm-modal__content', [
      h(DropdownList, {
        className: 'bpm-modal__dropdown-list',
        items: props.bpmRange,
        selectedItem: _.find(props.bpmRange, { value: props.BPM }),
        onSelect: props.onSelect,
      }),
    ]),
  ]);

const composed = compose(
  setDisplayName('BPMModal'),
  pure,
  setPropTypes({
    BPM: React.PropTypes.number.isRequired,
    close: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool.isRequired,
    set: React.PropTypes.func.isRequired,
  }),
  mapProps(props => ({
    ...props,
    bpmRange,
  })),
  withHandlers({
    onSelect: props => item => props.set(item.value),
  }),
)(component);

export const BPMModal = composed;
