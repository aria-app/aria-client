import React from 'react';
import h from 'react-hyperscript';
import { GridContainer } from '../grid/grid-container';
import { KeysContainer } from '../keys/keys-container';
import { SequencerToolbarContainer } from '../sequencer-toolbar/sequencer-toolbar-container';
import './sequencer.scss';

export class Sequencer extends React.Component {
  componentDidMount() {
    if (!this.contentRef) return;
    this.contentRef.scrollTop = getCenteredScroll(
      this.contentRef,
    );
  }

  render() {
    return h('.sequencer', [
      h(SequencerToolbarContainer),
      h('.sequencer__content', {
        onScroll: this.onContentScroll,
        ref: this.setContentRef,
      }, [
        h('.sequencer__content__wrapper', [
          h(KeysContainer),
          h(GridContainer, {
            sequencerContentRef: this.contentRef,
          }),
        ]),
      ]),
    ]);
  }

  setContentRef = (ref) => {
    this.contentRef = ref;
    this.forceUpdate();
  }
}

function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}
