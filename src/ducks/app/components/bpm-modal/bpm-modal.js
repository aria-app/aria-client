import _ from 'lodash';
import { compose, mapProps, pure, setDisplayName, setPropTypes } from 'recompose';
import React from 'react';
import h from 'react-hyperscript';
import shared from 'ducks/shared';
import './bpm-modal.scss';

const { DropdownList, Modal } = shared.components;
const { maxBPM, minBPM } = shared.constants;

const component = (props) =>
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
        onSelect: (item) => props.set(item.value),
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
  mapProps((props) => ({
    ...props,
    bpmRange: _.range(minBPM, maxBPM + 1)
      .map(n => ({
        text: n,
        value: n,
      })),
  })),
)(component);

export const BPMModal = composed;
