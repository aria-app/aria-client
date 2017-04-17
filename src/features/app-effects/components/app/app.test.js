import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import contextMenu from '../../../context-menu';
import sequenceEffects from '../../../sequence-effects';
import trackView from '../../../track-view';
import { BPMModalContainer } from '../bpm-modal/bpm-modal-container';
import { SongToolbarContainer } from '../song-toolbar/song-toolbar-container';
import { UploadOverlayContainer } from '../upload-overlay/upload-overlay-container';
import { App } from './app';

const { ContextMenuContainer } = contextMenu.components;
const { SequencerContainer } = sequenceEffects.components;
const { Tracker } = trackView.components;

describe('App Component', () => {
  it('should be defined', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    expect(component.length).toEqual(1);
  });

  it('should invoke file drag start event on drag enter', () => {
    const onFileDragStart = sinon.spy();
    const component = shallow(h(App, {
      ...getRequiredProps(),
      onFileDragStart,
    }));
    component.simulate('dragenter', {
      preventDefault: () => {},
      stopPropagation: () => {},
    });
    expect(onFileDragStart.calledOnce).toEqual(true);
  });

  it('should prevent default on drag enter', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const preventDefault = sinon.spy();
    component.simulate('dragenter', {
      stopPropagation: () => {},
      preventDefault,
    });
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('should stop propagation on drag enter', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const stopPropagation = sinon.spy();
    component.simulate('dragenter', {
      preventDefault: () => {},
      stopPropagation,
    });
    expect(stopPropagation.calledOnce).toEqual(true);
  });

  it('should prevent default on drag over', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const preventDefault = sinon.spy();
    component.simulate('dragover', {
      stopPropagation: () => {},
      preventDefault,
    });
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('should stop propagation on drag over', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const stopPropagation = sinon.spy();
    component.simulate('dragover', {
      preventDefault: () => {},
      stopPropagation,
    });
    expect(stopPropagation.calledOnce).toEqual(true);
  });

  it('should prevent default on drop', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const preventDefault = sinon.spy();
    component.simulate('drop', {
      stopPropagation: () => {},
      preventDefault,
    });
    expect(preventDefault.calledOnce).toEqual(true);
  });

  it('should stop propagation on drop', () => {
    const component = shallow(h(App, {
      ...getRequiredProps(),
    }));
    const stopPropagation = sinon.spy();
    component.simulate('drop', {
      preventDefault: () => {},
      stopPropagation,
    });
    expect(stopPropagation.calledOnce).toEqual(true);
  });

  describe('child component SequencerContainer', () => {
    it('should be defined when sequence is open', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
        isSequenceOpen: true,
      }));
      const sequencerContainerEl = component.find(SequencerContainer);
      expect(sequencerContainerEl.length).toEqual(1);
    });

    it('should not be defined when sequence is not open', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
        isSequenceOpen: false,
      }));
      const sequencerContainerEl = component.find(SequencerContainer);
      expect(sequencerContainerEl.length).toEqual(0);
    });
  });

  describe('child component Tracker', () => {
    it('should be defined when sequence not is open', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
        isSequenceOpen: false,
      }));
      const trackerEl = component.find(Tracker);
      expect(trackerEl.length).toEqual(1);
    });

    it('should not be defined when sequence is open', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
        isSequenceOpen: true,
      }));
      const trackerEl = component.find(Tracker);
      expect(trackerEl.length).toEqual(0);
    });
  });

  describe('child component SongToolbarContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
      }));
      const songToolbarContainerEl = component.find(SongToolbarContainer);
      expect(songToolbarContainerEl.length).toEqual(1);
    });
  });

  describe('child component BPMModalContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
      }));
      const bpmModalContainerEl = component.find(BPMModalContainer);
      expect(bpmModalContainerEl.length).toEqual(1);
    });
  });

  describe('child component ContextMenuContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
      }));
      const contextMenuContainerEl = component.find(ContextMenuContainer);
      expect(contextMenuContainerEl.length).toEqual(1);
    });
  });

  describe('child component UploadOverlayContainer', () => {
    it('should be defined', () => {
      const component = shallow(h(App, {
        ...getRequiredProps(),
      }));
      const uploadOverlayContainerEl = component.find(UploadOverlayContainer);
      expect(uploadOverlayContainerEl.length).toEqual(1);
    });
  });
});

function getRequiredProps() {
  return {
    isSequenceOpen: false,
    onFileDragStart: () => {},
  };
}
